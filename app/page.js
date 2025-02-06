"use client";

import Banner from "@/components/blocks/Banner";
import useLocalStorage from "@/components/store/localStorage";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const About = dynamic(() => import("@/components/blocks/About"));
const Jumpstart = dynamic(() => import("@/components/blocks/Jumpstart"));
const Crew = dynamic(() => import("@/components/blocks/Crew"));

export default function Home() {
  const { showLazy, setShowLazy } = useLocalStorage();

  const handleMouseEnter = () => {
    setShowLazy(true);
  };

  useEffect(() => {
    setShowLazy(false);

    const htmlElement = document.documentElement;
    htmlElement.addEventListener("mouseenter", handleMouseEnter);
    htmlElement.addEventListener("mousemove", handleMouseEnter);

    return () => {
      htmlElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [setShowLazy]);

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
    </>
  );
}
