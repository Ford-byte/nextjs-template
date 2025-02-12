"use client";
import { useEffect } from "react";
import Image from "next/image";
import useLocalStorage from "../store/localStorage";

export default function BannerTwo(props) {
  const { showLazy, setShowLazy } = useLocalStorage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !showLazy) {
        setShowLazy(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showLazy, setShowLazy]);

  return (
    <section className="relative h-[700px] text-white">
      <Image
        src={props?.image}
        width={1920}
        height={700}
        alt="background_image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 full-center text-5xl lg:text-7xl font-[600] tracking-widest bg-black/40 text-center uppercase font-tommy">
        {props?.header}
      </div>
    </section>
  );
}
