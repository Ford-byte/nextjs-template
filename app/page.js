"use client";

import Banner from "@/components/blocks/Banner";
import useLocalStorage from "@/components/store/localStorage";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const About = dynamic(() => import("@/components/blocks/About"));

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
      <Banner sample="sample text" />
      <About sample="sample text" />
      {showLazy && <Banner />}
    </>
  );
}
