"use client";

import React, { useEffect } from "react";

const DeptHero = ({ dept, setPhotoQs, photoQs, setIsLoading }) => {
  useEffect(() => {
    setIsLoading?.(false);
  }, [setIsLoading]);

  const canSwitch = typeof setPhotoQs === "function";

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {!photoQs ? dept.name : "Video Editing"}
        </h1>

        {dept.body && (
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {dept.body}
          </p>
        )}

        {canSwitch && (
          <label className="mt-6 inline-flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={!!photoQs}
              onChange={() => setPhotoQs(!photoQs)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            Switch to Video Editing?
          </label>
        )}
      </div>
    </section>
  );
};

export default DeptHero;
