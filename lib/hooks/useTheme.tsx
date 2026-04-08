"use client";
import { useEffect } from "react";

export default function UseTheme() {
  useEffect(() => {
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      html.classList.add("dark");
    } else if (savedTheme === "light") {
      html.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) html.classList.add("dark");
    }
  }, []);

  return null;
}
