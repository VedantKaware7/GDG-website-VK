"use client";

import React from "react";
import Link from "next/link";

const FOOTER_LINKS = [
  { name: "Home", path: "/" },
  { name: "Departments", path: "/departments" },
];

const Footer = () => {
  // Plain values. These never needed state or effects.
  const currentYear = new Date().getFullYear();
  const notice = `Organization · Recruitment Portal ${currentYear}`;

  return (
    <footer>
      <hr />
      <div>
        <p>{notice}</p>
        <div>
          {FOOTER_LINKS.map((link, idx) => (
            <React.Fragment key={link.path}>
              <Link href={link.path}>{link.name}</Link>
              {idx < FOOTER_LINKS.length - 1 && " | "}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
