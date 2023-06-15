"use client"
import { useEffect, useState } from "react";

export let isMobile = false; // Define the global variable

export function useIsMobile() {
  const [mobile, setMobile] = useState(isMobile);

  useEffect(() => {
    // Determine if the user is scrolling up or down and adjust the banner accordingly
    const handleResize = () => {
      setMobile(window.innerWidth <= 768); // Adjust the breakpoint if needed
    };

    handleResize(); // Set initial screen size
    window.addEventListener('resize', handleResize); // Update screen size on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, []);

  useEffect(() => {
    isMobile = mobile; // Update the global variable whenever the state changes
  }, [mobile]);

  return mobile;
}
