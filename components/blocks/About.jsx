import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useLocalStorage from "@/components/store/localStorage";

export default function About() {
  const { setShowLazy } = useLocalStorage();
  const [isAtBottom, setIsAtBottom] = useState(false);

  const sectionRef = useRef(null);

  const handleScroll = () => {
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();

    if (rect.bottom <= window.innerHeight) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      setShowLazy(true);
    }
  }, [isAtBottom, setShowLazy]);

  useEffect(() => {
    const section = sectionRef.current;
    section.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      section.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-full min-h-[550px]">
          <div className="">
            <Image
              src={`/images/bg_about.webp`}
              width={500}
              height={500}
              alt="Background"
              className="object-cover w-full h-[550px]"
            />
          </div>
          <div className="bg-black/20 absolute inset-0 z-[0]" />
          <div className="absolute inset-0 text-white center items-center lg:px-0 z-[1]">
            <div className="container lg:px-[52px] space-y-[24px]">
              <h2 className="text-7xl font-[500]">
                About Eclipse Fitness Gym.
              </h2>
              <p className="text-2xl">Get to know us</p>
              <div className="flex gap-x-[12px]">
                <div className="primary-button pointer">Learn More</div>
                <div className="tertiary-button text-black pointer">
                  Watch Video
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="center items-center relative min-h-[550px]">
          <div className="container py-[24px] lg:px-[52px] flex flex-col gap-y-[36px]">
            <h2 className="text-center text-4xl font-[700] font-[Cairo] text-blue-600">
              Join Eclipse and Transform Your Body and Mind
            </h2>
            <div className="space-y-[12px]">
              <h3 className="text-2xl font-[700] font-[Cairo] text-blue-600">
                Community
              </h3>
              <p className="text-justify">
                At Eclipse Fitness, we believe fitness is more than just a
                workout—it's a journey best shared with a supportive community.
                Our members come together to inspire, challenge, and celebrate
                each other’s progress every step of the way. Join us to
                experience the power of teamwork, encouragement, and shared
                success on your path to achieving your fitness goals. Together,
                we’re stronger.
              </p>
            </div>
            <div className="space-y-[12px]">
              <h3 className="text-2xl font-[700] font-[Cairo] text-blue-600 text-right">
                Motivation
              </h3>
              <p className="text-justify">
                At Eclipse Fitness, we know that staying motivated is key to
                reaching your fitness goals. That’s why we’re here to keep you
                inspired every step of the way. From energizing classes and
                expert trainers to progress tracking and success stories, we
                provide the tools and encouragement you need to push past limits
                and achieve your best self. Let us help you turn your drive into
                results—you’ve got this!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
