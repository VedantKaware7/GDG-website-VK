"use client";

import React from "react";
import Link from "next/link";

// Static copy. These were held in useState but never changed.
const HEADLINE = "Recruitment 2026";
const SUBHEADING = "Ready to make your mark?";
const DESCRIPTION =
  "Join our departments and work on real-world projects. Your journey starts here.";

export default function Hero() {
  return (
    <main>
      <h1>{HEADLINE}</h1>
      <h2>{SUBHEADING}</h2>
      <p>{DESCRIPTION}</p>
      <div>
        <Link href="/departments">
          <button type="button">Join us</button>
        </Link>
      </div>
    </main>
  );
}
