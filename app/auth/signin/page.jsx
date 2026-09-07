"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import DWASFWLoader from "@/components/GDGLoader";

export default function SignInPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user && !isPending) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending || session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <DWASFWLoader />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (mode === "signup" && !name) {
      toast.error("Please enter your name.");
      return;
    }

    setSubmitting(true);
    try {
      const res =
        mode === "signup"
          ? await authClient.signUp.email({ email, password, name, callbackURL: "/" })
          : await authClient.signIn.email({ email, password, callbackURL: "/" });

      if (res?.error) {
        toast.error(
          res.error.message ||
            (mode === "signup" ? "Failed to create account." : "Invalid credentials.")
        );
      } else {
        toast.success(mode === "signup" ? "Account created." : "Signed in.");
        router.push("/");
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error("Authentication failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const isSignup = mode === "signup";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
        Recruitment Portal
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isSignup ? "Create your account" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {isSignup
              ? "Register to start your application for Recruitment 2026."
              : "Sign in to continue your application."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                !isSignup
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isSignup
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  Please wait
                </>
              ) : isSignup ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(isSignup ? "signin" : "signup")}
              className="font-medium text-primary hover:underline"
            >
              {isSignup ? "Sign in" : "Register"}
            </button>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
