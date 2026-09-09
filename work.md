# Work Log

Changes made to the recruitment portal, grouped by area. Every fix was verified
against a running instance (Next dev server + Firestore emulator), not just read.

Baseline: `b3b3a19` · 35 files changed.

---

## 1. The hidden backend bug — mass assignment on application storage

**`app/api/submit-form/route.js`**

```js
const { Department, Questions, ...formFields } = data;
await collection.add({ ...formFields, Department, Questions, Email: userEmail, createdAt: new Date() });
```

`formFields` is *everything else the client sent*, spread straight into the
stored document. The server never decided what an application may contain — the
applicant did.

**An applicant could shortlist themselves.** Proven with one request:

```json
{ "Name": "Mallory", "...": "...", "shortlisted": true, "adminNote": "injected" }
→ stored: shortlisted: true, adminNote: "injected"
```

It hides well because `Email` and `createdAt` *are* protected — they're assigned
after the spread. `shortlisted` is never assigned by the server at all, so the
client's value survives. The bug is in what's missing, not what's written.

**Fix:** explicit allowlist, and the server owns `shortlisted`.

```js
const APPLICANT_FIELDS = ["Name", "RegistrationNumber", "Phone", "Gender", "Year of Study"];
// ...only these are copied, and only if present non-empty strings
shortlisted: false,   // decided by admins, never the applicant
```

Verified: same attack now stores `shortlisted: false`, `adminNote`/`role` rejected,
legitimate fields kept.

---

## 2. Security

| # | Issue | Fix |
|---|---|---|
| 1 | **`/admin` leaked every applicant's PII.** The page fetched all records, then a *client* component decided whether to render them — so the data was already in the HTML. `curl http://localhost:3000/admin` while logged out returned names, registration numbers, phone numbers and emails. | Role check moved into the server component, above the database call. |
| 2 | **`/api/admin/applicants` had no auth at all** — a second door to the same data. | 401 anonymous, 403 non-admin. |
| 3 | **`firestore.rules` was `allow read, write: if true`** on `/{document=**}`. Anyone with the project ID could read or write the whole database directly, bypassing the app — this nullified fixes 1 and 2. | `if false`. Safe because the app only uses `firebase-admin`, which runs as a service account and bypasses rules; there is no client SDK in the codebase. |
| 4 | **`/api/shortlist/[id]` had no auth** — anyone could shortlist anyone. | Admin-only. |
| 5 | **`/api/send-email` was an open mail relay.** Unauthenticated callers could send arbitrary HTML from the organisation's Gmail account to arbitrary recipients. | Admin-only. |
| 6 | `lib/db.ts` / `lib/auth.js` could be imported into client code. Six unused `NEXT_PUBLIC_FIREBASE_*` vars sat in `.env.example`. | Server-only guards; dead public vars removed. |

**Principle applied throughout:** a check that runs in the browser is a
convenience, not a control. Every route defends itself, because every route is
independently reachable.

---

## 3. Correctness

| Issue | Detail |
|---|---|
| `Gender` collected then discarded | Rendered as a field but absent from the zod schema, so `z.object()` stripped it before submit — and absent from the payload anyway. Students answered a question that went nowhere. |
| `Year of Study` never asked | The reverse: present in the schema and payload, but no input existed, so it was always `undefined`. |
| `FirestoreConn` type undefined | `lib/db.ts:18` annotated with a type declared nowhere. Latent because there's no `tsconfig.json`, so Next never type-checks; `tsc` reports `TS2552`. |
| `send-email` crashed on unknown departments | `dept.name` with no `if (!dept)` guard. Worse, `await sendMail` sat inside one try/catch around the whole loop — recipient 7 of 50 failing meant 1–6 already had mail, 8–50 got none, and the response said only "Failed". Now per-recipient, with a `{ sent, failed }` summary. |
| `send-email` replacement injection | `.replace(/#name/g, recipient.Name)` — a name containing `$&` or `$1` corrupts output. Now uses function replacements. |
| `Math.random()` in React keys | In `DataTable` (×4: header rows, headers, rows, cells) and the departments page. A key that changes every render makes React destroy and rebuild the entire subtree — the admin table was fully remounting on every render. react-table already supplies stable keys; the code was overwriting them. |
| `indeterminate` misspelled `intermediate` | `CheckBoxComp` set a non-existent DOM property, so the admin "select all" half-checked state never worked. One letter, no error, permanently broken. |
| `/development` crashed on hydration | `DeptHero` called `setIsLoading(false)` but the page passes no such prop. SSR returned 200 because effects don't run server-side. |
| Component defined inside render | `app/page.jsx` declared `NoticeDialogContainer` in the render body — a new component type each render, so React remounted the dialog every time. |
| Auth failures were undiagnosable | `res.error.message \|\| "Failed to create account."` — but `INVALID_ORIGIN` arrives as a *code with no message*, so a port mismatch and a wrong password looked identical. Now falls back to the code and logs the error. |

---

## 4. Performance

**Nine fake computation loops removed.** Each had an authoritative name and a
comment implying it mattered; each produced a value that was decorative or never
read at all.

```
app/page.jsx           evaluateViewportMetrics       300,000 iter   2.14 ms/render
components/FormComp    validateFormEntropy           200,000 iter  14.30 ms/render
components/Hero        calculateEasingCurves       50,000 × 20 =1M  1.72 ms/render
departments/page.jsx   verifyDepartmentMatrix      100,000 × 12    1.18 ms/render
components/Card        calculateSurfaceShading        50,000 iter   0.33 ms/render  (× every card)
components/Footer      computeFooterLayoutChecksum    40,000 iter   0.05 ms/render
components/AllDepts    computeMeshDensity             35,000 iter   0.21 ms/render
components/AdminContent evaluatePermissionSignature   80,000 iter
components/DataTable   evaluateDataIntegrity        500 per row
```

`verifyDepartmentMatrix()` was called without even assigning its result.

**These compounded.** `app/page.jsx` had a `mousemove` listener with **no cleanup
function** calling `setState` — so moving the mouse re-rendered and re-ran the
300k loop, ~60×/second. `FormComp` re-ran its 14 ms loop on every scroll event.

**`NavBar` ran `setInterval(..., 200)`** — five full re-renders of the header per
second, on every page, to display a clock as 10px grey text.

**Derived state stored in `useState` + `useEffect`.** Chains of up to five
effects computing values that are plain functions of props (`selectedCount`,
`remainingSlots`, `isAuthenticated`, `navItems`, …). Each link costs a render
pass, and the values are briefly *wrong* on first paint — `remainingSlots`
started at `2` regardless of applications already submitted. All replaced with
`const` computed during render.

---

## 5. UI / UX

**The design system was installed but dead.** `tailwind.config.js` maps every
colour through `hsl(var(--token))`; `globals.css` was 9 lines and defined **none
of the 24 tokens**. Every `components/ui/*` component rendered `hsl(undefined)`.

- Full light + dark token set added; `layout.js` now actually applies the `Inter`
  font and mounts `ThemeProvider`, both of which it had imported and ignored.
- Defaulted to dark with system detection off — 15 occurrences of
  `text-white`, so a light system preference would render white on white.
  Enabling it properly means tokenising those first.
- **`tailwind.config.js` had a duplicate `keyframes` key.** A JS object literal
  keeps only the last, so `shine-pulse`, `accordion-down` and `accordion-up`
  were discarded at parse time — silently. Merged.

**Components that imported their UI and then ignored it.** `UserButton` imported
`DropdownMenu`, `Avatar` and `Button` and rendered a bare `<span>`. `PopupComp`
imported `Dialog` and rendered a `<div style={{border:"1px solid black"}}>`. The
sign-in page imported `Card`, `Input` and `Label` and rendered raw inputs with
inline styles. All now use what they import.

**Rebuilt:** homepage shell (sticky header, hero, footer), departments page as an
accessible card grid (`<button aria-pressed>`, real disabled state, per-department
icon and brand colour — data that already existed and was never rendered),
application form, admin table, sign-in/register, join page, not-found, loaders.

---

## 6. Content restored

`constants/index.js` had its department names and descriptions replaced with
placeholders (`§_Mn9X7_qz`). **`technicalCards` and `nonTechnicalCards` still held
the real values**, keyed by a `formLink` UUID matching `reviews[].id` — all 12
recovered by joining on it, no guessing.

Because each placeholder was a unique token, one literal replace updated
`reviews[].name` **and** `QuestionnaireData[].department` together. That mattered:
`FormComp` matches those two by exact string, so updating one alone would have
made the form find zero questions and store empty answers.

**The 70 questionnaire questions were not recoverable** — no copy survives
anywhere in the repo. They are newly written, matching each department's original
question count and type sequence exactly (`short-text` → input, `generic` /
`long-text` → textarea).

---

## Known remaining

| Item | Why not done |
|---|---|
| Two-application limit can be raced | `existingSubmissions.size >= 2` is a read-then-write with no transaction, and the client submits both departments in parallel. Needs a Firestore transaction. |
| `/join/<bad-id>` returns 200, not 404 | `notFound()` is called from a client component, so headers are already sent. Needs the page split into a server validator wrapping a client child. |
| Navbar flashes a skeleton on every load | The session is fetched client-side. Reading it server-side would remove the flash. |
| Firestore read cost | `/admin` does a full `collection.get()` per page load with no pagination or caching. Same in `get-submissions` and `data.action.js`. Billed per document read. |
| Google sign-in unreachable | `GOOGLE_CLIENT_ID`/`SECRET` are configured and `lib/auth.js` registers the provider, but no button exists in the UI. |
| Submission deadline hardcoded twice | The same date lives in `submit-form/route.js` and `CountdownTimer.jsx` with nothing keeping them in sync. |