"use client";

import BannerTwo from "@/components/blocks/BannerTwo";
import useLocalStorage from "@/components/store/localStorage";
import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";

const AboutTwo = dynamic(() => import("@/components/blocks/AboutTwo"));
const Contact = dynamic(() => import("@/components/blocks/Contact"), {
  loading: () => <div>Loading...</div>,
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
      <BannerTwo header={`TRAINING`} image={`/images/bg_training.webp`} />
    </>
  );
}
