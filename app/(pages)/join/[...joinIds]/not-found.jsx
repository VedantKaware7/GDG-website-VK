import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-5 w-5 text-muted-foreground" />
      </span>
      <h2 className="text-2xl font-semibold text-foreground">
        Department not found
      </h2>
      <p className="mt-3 text-muted-foreground">
        Sorry, the department you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/departments"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse all departments
        </Link>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input px-6 text-sm font-medium transition-colors hover:bg-accent"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
