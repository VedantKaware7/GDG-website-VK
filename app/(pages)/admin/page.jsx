import React from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { connect, serializeFirestoreData } from "@/lib/db";
import { auth } from "@/lib/auth";
import AdminContent from "@/components/AdminContent";
import { ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Check permission before reading the database. Anything fetched above
  // this point is sent to the browser even if we then refuse to show it.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="max-w-md text-center">
            <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </span>
            <h1 className="text-2xl font-semibold text-foreground">Access denied</h1>
            <p className="mt-3 text-muted-foreground">
              You are not authorized to view this page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const db = await connect();
  const snapshot = await db.collection("formData").get();
  const applicants = snapshot.docs.map((doc) => ({
    id: doc.id,
    _id: doc.id,
    ...serializeFirestoreData(doc.data()),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <AdminContent applicants={applicants} />
      </main>
      <Footer />
    </div>
  );
}
