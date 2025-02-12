"use client";

import BannerTwo from "@/components/blocks/BannerTwo";
import useLocalStorage from "@/components/store/localStorage";
import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";

const AboutTwo = dynamic(() => import("@/components/blocks/AboutTwo"));
const Contact = dynamic(() => import("@/components/blocks/Contact"), {
  ssr: false,
});

export default function Page() {
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
      <BannerTwo
        header={`ABOUT US`}
        image={`/images/bg_bannerTwo.webp`}
        mobile_image={"/images/mbg_banner.webp"}
        buttons={{ button1: `Hire a coach`, button2: `Login` }}
      />
      <AboutTwo title={`ABOUT US`} />
      {showLazy && <Contact />}
    </>
  );
}
