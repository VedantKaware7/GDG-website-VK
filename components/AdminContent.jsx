"use client";
import React from "react";
import DataTable from "./DataTable";

const AdminContent = ({ applicants }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Admin
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Applications
        </h1>
        <p className="mt-2 text-muted-foreground">
          {applicants.length} application{applicants.length === 1 ? "" : "s"} received
        </p>
      </header>

      <DataTable data={applicants} />
    </div>
  );
};

export default AdminContent;
