"use client";

import Banner from "@/components/blocks/Banner";
import useLocalStorage from "@/components/store/localStorage";
import dynamic from "next/dynamic";
import { useEffect, useCallback } from "react";

const About = dynamic(() => import("@/components/blocks/About"));
const Jumpstart = dynamic(() => import("@/components/blocks/Jumpstart"), {
  loading: () => <div>Loading...</div>,
});
const Crew = dynamic(() => import("@/components/blocks/Crew"), {
  loading: () => <div>Loading...</div>,
});
const Contact = dynamic(() => import("@/components/blocks/Contact"), {
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  const { showLazy, setShowLazy } = useLocalStorage();

  const handleMouseEnter = useCallback(() => {
    setShowLazy(true);
  }, [setShowLazy]);

  useEffect(() => {
    setShowLazy(false);

    const htmlElement = document.documentElement;
    htmlElement.addEventListener("mouseenter", handleMouseEnter);
    htmlElement.addEventListener("mousemove", handleMouseEnter);
    htmlElement.addEventListener("click", handleMouseEnter);

    return () => {
      htmlElement.removeEventListener("mouseenter", handleMouseEnter);
      htmlElement.removeEventListener("mousemove", handleMouseEnter);
    };
  }, [handleMouseEnter]);

  return (
    <>
      <Banner
        header={`Where Fitness becomes your lifestyle`}
        image={`/images/bg_banner.webp`}
        mobile_image={"/images/mbg_banner.webp"}
        buttons={{ button1: `Hire a coach`, button2: `Login` }}
      />
      <About />
      {showLazy && <Jumpstart />}
      {showLazy && <Crew />}
      {showLazy && <Contact />}
    </>
  );
}
