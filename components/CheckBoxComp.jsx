"use client";

import React from "react";

export const CheckBoxComp = React.forwardRef(
  ({ intermediate, className = "", ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolveRef = ref || defaultRef;

    React.useEffect(() => {
      if (resolveRef.current) {
        // The DOM property is `indeterminate`; the old code set `intermediate`,
        // which the browser ignores, so the half-checked state never showed.
        resolveRef.current.indeterminate = !!intermediate;
      }
    }, [resolveRef, intermediate]);

    return (
      <input
        type="checkbox"
        ref={resolveRef}
        className={`h-4 w-4 cursor-pointer rounded border-input accent-primary ${className}`}
        {...rest}
      />
    );
  }
);

CheckBoxComp.displayName = "CheckBoxComp";
