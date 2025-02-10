"use client";

import { useParams } from "next/navigation";
import BannerTwo from "@/components/blocks/BannerTwo";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  const params = useParams();
  const id = params?.id;
  const [routine, setRoutine] = useState(id);
  const [workout, setWorkout] = useState([]);

  const HIIT = useMemo(
    () => [
      {
        title: "Push-Up",
        intensity: "High",
        duration: 60,
        description:
          "A bodyweight exercise that targets the chest, shoulders, and triceps while also engaging the core and lower body for stability.",
        image: "/images/pushup.webp",
      },
      {
        title: "Mountain Climber",
        intensity: "High",
        duration: 60,
        description:
          "A full-body cardio exercise that engages the core, legs, and arms, mimicking the motion of climbing to build strength and endurance",
        image: "/images/climb.webp",
      },
      {
        title: "Crunches",
        intensity: "High",
        duration: 60,
        description:
          "An abdominal exercise that strengthens the core by isolating the upper abs and improving overall core stability.",
        image: "/images/crunch.webp",
      },
    ],
    []
  );
  const STRENGTH = useMemo(
    () => [
      {
        title: "Bench Press",
        intensity: "High",
        duration: 60,
        description:
          "A compound exercise that targets the chest, shoulders, and triceps, while also engaging the core, back, and lower body",
        image: "/images/bench.webp",
      },
      {
        title: "Overhead Press",
        intensity: "High",
        duration: 60,
        description:
          "The overhead press, also known as the shoulder press, military press, or strict press, is a weight training exercise that strengthens the upper body, particularly the shoulders and triceps",
        image: "/images/overhead.webp",
      },
      {
        title: "Bicep Curls",
        intensity: "High",
        duration: 60,
        description:
          "A bicep curl is an exercise that builds muscle and strength in the upper arm. Here are some tips for performing a bicep curl.",
        image: "/images/bicep.webp",
      },
    ],
    []
  );
  const ENDURANCE = useMemo(
    () => [
      {
        title: "Bench Press",
        intensity: "High",
        duration: 60,
        description:
          "A compound exercise that targets the chest, shoulders, and triceps, while also engaging the core, back, and lower body",
        image: "/images/bench.webp",
      },
      {
        title: "Overhead Press",
        intensity: "High",
        duration: 60,
        description:
          "The overhead press, also known as the shoulder press, military press, or strict press, is a weight training exercise that strengthens the upper body, particularly the shoulders and triceps",
        image: "/images/overhead.webp",
      },
      {
        title: "Bicep Curls",
        intensity: "High",
        duration: 60,
        description:
          "A bicep curl is an exercise that builds muscle and strength in the upper arm. Here are some tips for performing a bicep curl.",
        image: "/images/bicep.webp",
      },
    ],
    []
  );

  useEffect(() => {
    switch (routine) {
      case "hiit":
        setWorkout(HIIT);
        break;
      case "strength":
        setWorkout(STRENGTH);
        break;
      case "endurance":
        setWorkout(ENDURANCE);
        break;
      default:
        break;
    }
  }, [routine]);
  return (
    <>
      <BannerTwo
        header={`${id} exercises`}
        image={`/images/bg_bannerTwo.webp`}
      />
      <section className="relative min-h-[700px] py-[24px] center flex-col items-center">
        <div className="container">
          {workout?.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 py-[24px] gap-[24px]"
              >
                <div className="">
                  <Image
                    src={item?.image}
                    width={500}
                    height={300}
                    alt="image"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-blue-500 text-3xl font-[700]">
                    {item?.title}
                  </h2>
                  <span className="flex items-center gap-[12px] text-[16px]">
                    <label>
                      <strong className="text-[20px]">Intensity:</strong>
                    </label>
                    <p>{item?.intensity}</p>
                  </span>
                  <span className="flex items-center gap-[12px] text-[16px]">
                    <label>
                      <strong className="text-[20px]">Duration:</strong>
                    </label>
                    <p>{item?.duration} seconds</p>
                  </span>
                  <p className="py-[12px]">{item?.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          href={`/training`}
          className="px-[24px] py-[12px] bg-[#2E2EFF] text-white font-[700] my-[12px]"
        >
          BACK
        </Link>
      </section>
    </>
  );
}
