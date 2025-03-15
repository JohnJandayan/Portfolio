"use client";

import { useEffect } from "react";

export function useCursorGlow() {
  useEffect(() => {
    // Find all elements with cursor-glow class
    const glowElements = document.querySelectorAll(".cursor-glow");

    // Function to update glow position
    const handleMouseMove = (e: MouseEvent, element: Element) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Apply CSS custom properties to position the glow
      (element as HTMLElement).style.setProperty("--cursor-x", `${x}px`);
      (element as HTMLElement).style.setProperty("--cursor-y", `${y}px`);
    };

    // Add listeners to all glow elements
    glowElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent, element));
    });

    // Cleanup
    return () => {
      glowElements.forEach((element) => {
        element.removeEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent, element));
      });
    };
  }, []);

  return null;
}