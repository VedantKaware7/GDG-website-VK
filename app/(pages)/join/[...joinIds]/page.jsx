"use client";
import React, { useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { reviews } from "@/constants/index";

import NavBar from "@/components/NavBar";
import FormComp from "@/components/FormComp";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const JoinDepartmentPage = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isSignedIn = !!user;

  const ids = params.joinIds ?? [];
  const departments = reviews.filter((dept) => ids.includes(dept.id));
  const valid = ids.every((id) => reviews.some((dept) => dept.id === id));

  if (!valid) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1">
        {isPending ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
          </div>
        ) : isSignedIn ? (
          <FormComp
            dept1={departments[0]}
            dept2={departments[1]}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
            <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </span>
            <h2 className="text-2xl font-semibold text-foreground">
              Sign in required
            </h2>
            <p className="mt-3 text-muted-foreground">
              Please sign in to access the application form.
            </p>
            <Button className="mt-8" onClick={() => router.push("/auth/signin")}>
              Sign In
            </Button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default JoinDepartmentPage;
