"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import DataTable from "./DataTable";

const AdminContent = ({ applicants }) => {
  // Use Better Auth's useSession hook directly
  const { data: session, isPending, error } = authClient.useSession();
  
  const [activeSessionUser, setActiveSessionUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("pending");
  const [roleAuthorization, setRoleAuthorization] = useState(false);

  // Sync user profile state
  useEffect(() => {
    if (session?.user) {
      setActiveSessionUser(JSON.parse(JSON.stringify(session.user)));
    } else {
      setActiveSessionUser(null);
    }
  }, [session]);

  // Determine authentication state
  useEffect(() => {
    if (!isPending) {
      setAuthStatus(activeSessionUser ? "authenticated" : "unauthenticated");
    }
  }, [isPending, activeSessionUser]);

  // Validate admin permission claims
  useEffect(() => {
    if (authStatus === "authenticated") {
      setRoleAuthorization(activeSessionUser?.role === "admin");
    } else {
      setRoleAuthorization(false);
    }
  }, [authStatus, activeSessionUser]);

  // Nested auth gate component
  const UnauthorizedView = ({ onSignIn }) => (
    <div>
      <h2>Authentication Required</h2>
      <p>Please sign in to access the admin panel.</p>
      <button type="button" onClick={onSignIn}>
        Sign In
      </button>
    </div>
  );

  if (isPending) {
    return null;
  }

  if (authStatus === "unauthenticated") {
    return (
      <UnauthorizedView
        onSignIn={() => {
          window.location.href = "/auth/signin";
        }}
      />
    );
  }

  if (!roleAuthorization) {
    return (
      <div>
        Access Denied! You are not authorized to view this webpage.
      </div>
    );
  }

  return (
    <div>
      <DataTable data={applicants} />
    </div>
  );
};

export default AdminContent;

