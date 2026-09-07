require("dotenv").config();
import nodemailer from "nodemailer";
import { reviews } from "@/constants";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const transporter = nodemailer.createTransport({
    service: "gmail", // or your preferred email service
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Groups sibling departments under one display name in emails, so #dept reads
// "Development Department" rather than "Web Dev".
const DEPARTMENT_LABELS = {
    "Web Dev": "Development Department",
    "App Dev": "Development Department",
};
export async function POST(req) {
    // This route sends mail from the organisation's own Gmail account, with a
    // caller-supplied subject, body and recipient list. Without a check anyone
    // could send anything to anyone, signed as the organisation.
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return new Response(
            JSON.stringify({ error: "Authentication required" }),
            { status: 401 }
        );
    }

    if (session.user.role !== "admin") {
        return new Response(
            JSON.stringify({ error: "Forbidden" }),
            { status: 403 }
        );
    }

    const { recipients, payloadData } = await req.json();

    if (!recipients || recipients.length === 0) {
        return new Response(
            JSON.stringify({ error: "No recipients provided" }),
            { status: 400 }
        );
    }

    if (!payloadData?.subject || !payloadData?.body) {
        return new Response(
            JSON.stringify({ error: "subject and body are required" }),
            { status: 400 }
        );
    }

    const sent = [];
    const failed = [];

    // Sent one at a time on purpose: Gmail app passwords have low rate limits
    // and firing these in parallel gets the account flagged.
    for (const recipient of recipients) {
        try {
            if (!recipient?.Email) {
                failed.push({ email: null, reason: "missing email address" });
                continue;
            }

            const known = reviews.find((item) => item.name === recipient.Department);
            const deptName = DEPARTMENT_LABELS[known?.name] ?? known?.name ?? recipient.Department ?? "your department";

            // Function replacements, so a name containing $& or $1 is inserted
            // literally instead of being treated as a replacement pattern.
            const html = `
                <div>
                    ${payloadData.body}
                </div>
                `
                .replace(/#name/g, () => recipient.Name ?? "")
                .replace(/#dept/g, () => deptName);

            await transporter.sendMail({
                from: process.env.EMAIL_USERNAME,
                to: recipient.Email,
                subject: payloadData.subject,
                html,
            });

            sent.push(recipient.Email);
        } catch (error) {
            // One bad recipient must not abandon the rest of the batch.
            console.error(`Failed to email ${recipient?.Email}:`, error.message);
            failed.push({ email: recipient?.Email ?? null, reason: error.message });
        }
    }

    if (!sent.length) {
        return new Response(
            JSON.stringify({ error: "Failed to send emails", failed }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({
            message: `Sent ${sent.length} of ${recipients.length} emails`,
            sent: sent.length,
            failed,
        }),
        { status: 200 }
    );
}
