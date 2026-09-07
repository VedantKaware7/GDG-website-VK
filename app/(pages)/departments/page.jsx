"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { reviews } from "@/constants";
import { useSubmissions } from "@/components/SubmissionsProvider";

const departments = reviews;

const DepartmentsListPage = () => {
  const router = useRouter();
  const { submittedDepartments } = useSubmissions();

  // The only real state on this page is what the user has ticked.
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Everything below is derived during render. Holding these in useState and
  // syncing them with useEffect only added extra render passes, and meant the
  // values were briefly wrong on first paint.
  const selectedCount = selectedDepartments.length;
  const remainingSlots = 2 - submittedDepartments.length;
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
      const isSelected = current.includes(departmentName);

      if (isSelected) {
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
    <main>
      <NavBar />

      <div>
        <header>
          <p>Step 01 · Select</p>
          <h1>Pick your departments</h1>
          <p>
            Select up to <strong>two</strong> departments. Check the departments you wish to apply for.
          </p>
          <p>
            <strong>{selectedCount} / 2 selected</strong>
          </p>
          <button
            type="button"
            onClick={goToApplication}
            disabled={isContinueDisabled}
          >
            Continue to application →
          </button>
        </header>

        <hr />

        <section>
          <h2>Available Departments</h2>
          <ul>
            {departments.map((department) => {
              const isSelected = selectedDepartments.includes(department.name);
              const isSubmitted = submittedDepartments.includes(department.name);

              return (
                <li key={department.id} style={{ margin: "16px 0" }}>
                  <label>
                    <input
                      type="checkbox"
                      disabled={isSubmitted}
                      checked={isSelected}
                      onChange={() => toggleDepartment(department.name)}
                    />
                    {" "}
                    <strong>{department.name}</strong>
                    {isSubmitted && " (Already Submitted)"}
                  </label>
                  <p>{department.description}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default DepartmentsListPage;
