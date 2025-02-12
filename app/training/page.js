"use client";

import BannerTwo from "@/components/blocks/BannerTwo";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [routine, setRoutine] = useState("HIIT");
  const [workout, setWorkout] = useState([]);

  const HIIT = useMemo(
    () => [
      {
        title: "About",
        description:
          "HIIT (High-Intensity Interval Training) is a form of exercise that alternates between short bursts of intense activity and periods of lower-intensity recovery or rest. It's designed to maximize efficiency by providing a highly effective workout in a shorter time compared to traditional steady-state cardio.",
      },
      {
        title: "Benefits of HIIT",
        list: [
          "Improves Cardiovascular Health",
          "Boosts heart health and endurance in a shorter time",
          "Burns More Calories",
          "Higher calorie burn during and after the workout due to the 'afterburn effect' (EPOC - Excess Post-Exercise Oxygen Consumption)",
          "Builds Strength and Endurance",
          "Combines strength and cardio elements",
          "Convenient",
          "Can be done without equipment and in small spaces",
          "Enhances Metabolism",
          "May boost metabolism for hours post-workout",
        ],
      },
      {
        title: "Why Should Try HIIT?",
        description:
          "HIIT (High-Intensity Interval Training) is a form of exercise that alternates between short bursts of intense activity and periods of lower-intensity recovery or rest. It's designed to maximize efficiency by providing a highly effective workout in a shorter time compared to traditional steady-state cardio.",
      },
      {
        button: "view exercises",
        link: "/training/exercise/hiit",
      },
    ],
    []
  );

  const STRENGTH = useMemo(
    () => [
      {
        title: "About",
        description:
          "Strength training, also known as resistance or weight training, focuses on building muscular strength, endurance, and power. It involves exercises that challenge muscles through resistance, such as lifting weights, using resistance bands, or bodyweight exercises, promoting overall physical resilience and functionality",
      },
      {
        title: "Benefits of Strength",
        list: [
          "Promotes muscle growth through resistance training",
          "Enhances muscle strength and endurance",
          "Reduces the risk of osteoporosis",
          "Strengthens bones by applying stress through weightlifting",
          "Increases resting metabolism as muscle burns more calories than fat",
          "Supports long-term weight management",
          "Improves the ability to perform daily activities with ease",
          "Reduces the risk of injury by strengthening stabilizing muscles",
          "Boosts confidence and self-esteem",
          "Releases endorphins that help reduce stress and improve mood",
        ],
      },
      {
        title: "Why Should Try Strength?",
        description:
          "Strength training is a key component of physical fitness, offering numerous benefits for both the body and mind. Whether your goal is to improve functional strength, enhance your physique, or simply stay active, strength training provides a foundation for a healthy and balanced lifestyle",
      },
      {
        button: "view exercises",
        link: "/training/exercise/strength",
      },
    ],
    []
  );
  const ENDURANCE = useMemo(
    () => [
      {
        title: "About",
        description:
          "Endurance training, also known as aerobic or stamina training, focuses on improving the body's ability to sustain physical activity over extended periods. It involves exercises that increase your heart rate and breathing for an extended duration, enhancing the efficiency of your cardiovascular and respiratory systems",
      },
      {
        title: "Benefits of Strength",
        list: [
          "Strengthens the heart, improving its ability to pump blood",
          "Reduces the risk of heart diseas",
          "Improves oxygen intake and delivery to muscles",
          "Boosts overall stamina",
          "Boosts mitochondrial function for energy production at the cellular level",
          "Helps reduce fatigue and sustain energy levels",
          "Increases calorie expenditure",
          "Supports maintaining or losing weight effectively",
          "Releases endorphins that reduce stress, anxiety, and depression",
          "Boosts mood and cognitive function",
        ],
      },
      {
        title: "Why Should Try Strength?",
        description:
          "Strength training is a key component of physical fitness, offering numerous benefits for both the body and mind. Whether your goal is to improve functional strength, enhance your physique, or simply stay active, strength training provides a foundation for a healthy and balanced lifestyle",
      },
      {
        button: "view exercises",
        link: "/training/exercise/endurance",
      },
    ],
    []
  );

  useEffect(() => {
    switch (routine) {
      case "HIIT":
        setWorkout(HIIT);
        break;
      case "STRENGTH":
        setWorkout(STRENGTH);
        break;
      case "ENDURANCE":
        setWorkout(ENDURANCE);
        break;
      default:
        setWorkout([]);
        break;
    }
  }, [routine]);

  return (
    <>
      <BannerTwo
        header={`${routine} TRAINING`}
        image={`/images/bg_training.webp`}
      />

      <div className="min-h-[100px] center py-[24px]">
        <div className="container flex flex-col lg:flex-row items-center gap-[24px] justify-between">
          {["HIIT", "STRENGTH", "ENDURANCE"]?.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-black center py-[24px] text-2xl font-[500] pointer shadow-lg"
                onClick={() => {
                  setRoutine(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <section className="relative min-h-[700px] px-[16px]">
        <div className="center flex-col gap-y-[24px] items-center">
          {workout?.map((item, index) => (
            <div
              key={index}
              className="py-[24px] lg:w-[700px] text-justify space-y-[24px] border-b border-black"
            >
              {item.title && (
                <h2 className="text-4xl font-[700] text-blue-500 text-center">
                  {item.title}
                </h2>
              )}
              {item.description && <p>{item.description}</p>}
              {item.list && (
                <ul className="list-disc list-inside">
                  {item.list.map((data, i) => (
                    <li key={i} className="bullet ">
                      {data}
                    </li>
                  ))}
                </ul>
              )}
              {item.button && item.link && (
                <a
                  href={item.link}
                  className="text-white  font-[500] text-center bg-[#2E2EFF] px-[24px] py-[24px] shadow-sm center uppercase"
                >
                  {item.button}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
