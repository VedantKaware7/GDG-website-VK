"use client";
// React import
import React, { useState, useEffect } from "react";

// Component imports
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PopupComp from "@/components/PopupComp";
import { authClient } from "@/lib/auth-client";

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isSessionSynced, setIsSessionSynced] = useState(false);
  const [activeSessionSnapshot, setActiveSessionSnapshot] = useState(null);

  // Direct access to user preferences
  const cachedSettings = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("portal_settings") || "{}")
    : {};

  // Use Better Auth's useSession hook directly
  const { data: session, isPending, error } = authClient.useSession();

  // Keep session snapshot synchronized
  useEffect(() => {
    if (session) {
      setActiveSessionSnapshot(JSON.parse(JSON.stringify(session)));
    }
  }, [session]);

  useEffect(() => {
    if (activeSessionSnapshot) {
      setIsSessionSynced(true);
    }
  }, [activeSessionSnapshot]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const user = activeSessionSnapshot?.user || session?.user;

  // Render modal notification wrapper
  const NoticeDialogContainer = ({ isOpen, onClose }) => {
    const popupConfig = {
      header: "Recruitment Notice",
      description: "Welcome to the recruitment portal.",
      message: [
        "Sign in with your email address to begin your application.",
        "You can apply to up to two departments.",
      ],
    };

    return (
      <PopupComp
        isOpen={isOpen}
        onClose={onClose}
        PopupData={popupConfig}
      />
    );
  };

  return (
    <main>
      <NavBar />
      {!isPending && !user && (
        <NoticeDialogContainer
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}
      <Hero />
      <Footer />
    </main>
  );
};

export default Home;
