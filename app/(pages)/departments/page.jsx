"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { reviews } from "@/constants";
import { useSubmissions } from "@/components/SubmissionsProvider";
import { ArrowRight, Check, Lock } from "lucide-react";

const departments = reviews;
const MAX_APPLICATIONS = 2;

const DepartmentsListPage = () => {
  const router = useRouter();
  const { submittedDepartments } = useSubmissions();

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const selectedCount = selectedDepartments.length;
  const remainingSlots = MAX_APPLICATIONS - submittedDepartments.length;
  const selectedIds = departments
    .filter((dept) => selectedDepartments.includes(dept.name))
    .map((dept) => dept.id);
  const isContinueDisabled = selectedIds.length === 0;

  const toggleDepartment = (departmentName) => {
    if (submittedDepartments.includes(departmentName)) {
      toast.error(`You have already submitted an application for ${departmentName}.`);
      return;
    }

    if (remainingSlots <= 0) {
      toast.error("You have already submitted the maximum allowed (2) applications.");
      return;
    }

    setSelectedDepartments((current) => {
      if (current.includes(departmentName)) {
        return current.filter((name) => name !== departmentName);
      }

      if (current.length >= remainingSlots) {
        toast.error(`You can select at most ${remainingSlots} department(s).`);
        return current;
      }

      return [...current, departmentName];
    });
  };

  const goToApplication = () => {
    if (!selectedIds.length) return;
    router.push(`/join/${selectedIds.join("/")}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <header className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Step 01 · Select
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pick your departments
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              Select up to <strong className="text-foreground">two</strong> departments.
              You can apply to {remainingSlots > 0 ? remainingSlots : 0} more.
            </p>
          </header>

          <section className="mt-10">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((department) => {
                const isSelected = selectedDepartments.includes(department.name);
                const isSubmitted = submittedDepartments.includes(department.name);
                const Icon = department.icon;

                return (
                  <li key={department.id}>
                    <button
                      type="button"
                      onClick={() => toggleDepartment(department.name)}
                      disabled={isSubmitted}
                      aria-pressed={isSelected}
                      className={`group relative flex h-full w-full flex-col rounded-xl border p-5 text-left transition-all
                        ${isSubmitted
                          ? "cursor-not-allowed border-border bg-muted/40 opacity-60"
                          : isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                            : "border-border bg-card hover:border-primary/50 hover:bg-accent/40"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${department.tone}20`, color: department.tone }}
                        >
                          {Icon && <Icon size={24} />}
                        </span>

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors
                            ${isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                            }`}
                        >
                          {isSubmitted ? (
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          ) : isSelected ? (
                            <Check className="h-3 w-3" />
                          ) : null}
                        </span>
                      </div>

                      <h2 className="mt-4 font-semibold text-foreground">
                        {department.name}
                      </h2>

                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {department.description}
                      </p>

                      {isSubmitted && (
                        <span className="mt-4 inline-flex w-fit items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                          Already submitted
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>

      <div className="sticky bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{selectedCount}</strong> / {MAX_APPLICATIONS} selected
          </p>
          <Button onClick={goToApplication} disabled={isContinueDisabled} className="group">
            Continue to application
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DepartmentsListPage;
