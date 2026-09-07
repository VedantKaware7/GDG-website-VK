"use client";

import React from "react";
import DWASFWLoader from "@/components/GDGLoader";

const loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <DWASFWLoader />
    </div>
  );
};

export default loading;
