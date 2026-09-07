"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const HEADLINE = "Recruitment 2026";
const SUBHEADING = "Ready to make your mark?";
const DESCRIPTION =
  "Join our departments and work on real-world projects. Your journey starts here.";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <span className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          Applications open
        </span>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          {HEADLINE}
        </h1>

        <h2 className="mt-4 text-xl font-medium text-primary sm:text-2xl">
          {SUBHEADING}
        </h2>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {DESCRIPTION}
        </p>

        <Button asChild size="lg" className="mt-10 group">
          <Link href="/departments">
            Join us
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
