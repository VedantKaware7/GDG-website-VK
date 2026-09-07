"use client";
import React from "react";
import Link from "next/link";
import UserButton from "./UserButton";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

const NavBar = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  const navItems = [
    { label: "Departments", href: "/departments" },
    ...(isAdmin ? [{ label: "Admin Panel", href: "/admin" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
          Recruitment Portal
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : isAuthenticated ? (
            <UserButton user={user} />
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
