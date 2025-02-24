"use client";

import Banner from "@/components/blocks/Banner";
import About from "@/components/blocks/About";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";

const Jumpstart = dynamic(() => import("@/components/blocks/Jumpstart"), {
  ssr: false,
});
const Crew = dynamic(() => import("@/components/blocks/Crew"), { ssr: false });
const Contact = dynamic(() => import("@/components/blocks/Contact"), {
  ssr: false,
});

export default function Home() {
  const [showLazy, setShowLazy] = useState(false);
  const observerRef = useRef(null);



  useEffect(() => {

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowLazy(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  return (
    <>
      <Banner
        header="Where Fitness becomes your lifestyle"
        image="/images/bg_banner.webp"
        mobile_image="/images/mbg_banner.webp"
        buttons={{ button: "Hire a coach", link: "#" }}
      />
      <About />
      <div ref={observerRef}>
        {showLazy && <Jumpstart />}
        {showLazy && <Crew />}
        {showLazy && <Contact />}
      </div>
    </>
  );
}
