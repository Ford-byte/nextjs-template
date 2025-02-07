import Image from "next/image";

export default function AboutTwo() {
  return (
    <section className="relative">
      <div className="center py-[62px] h-fit bg-gradient-to-b from-blue-500 to-black">
        <div className="container space-y-[62px]">
          <h2 className="text-3xl text-white text-shadow-lg text-center font-[600]">
            ECLIPSE FITNESS GYM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-[32px] gap-x-[12px]">
            <div className="col-span-2 space-x-[12px]">
              <div className="space-y-[12px] shadow-lg sm:shadow-none p-[6px] lg:p-0">
                <h3 className="text-5xl text-shadow-lg font-[700] text-[#200C7A] px-[16px]">
                  OUR MISSION
                </h3>
                <p className="text-justify text-white text-[18px] px-[16px]">
                  To empower individuals to achieve their fitness goals by
                  providing an accessible, engaging, and supportive online
                  platform that enhances their fitness journey. The website will
                  promote a healthy lifestyle, foster a sense of community, and
                  simplify the process of staying active and informed.
                </p>
              </div>
            </div>
            <div className="col-start-4 hidden lg:flex">
              <Image
                src={`/images/barbel.webp`}
                width={500}
                height={500}
                alt="image"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="col-span-2 space-y-[12px] ">
              <div className="space-y-[12px] shadow-lg sm:shadow-none p-[6px] lg:p-0">
                <h3 className="text-5xl text-shadow-lg font-[700] text-[#200C7A] px-[16px]">
                  OUR VISION
                </h3>
                <p className="text-justify text-white text-[18px] px-[16px]">
                  To become a leading digital fitness platform that bridges the
                  gap between physical and virtual fitness services, inspiring a
                  healthier and happier community. The website will reflect the
                  gym's commitment to innovation, inclusivity, and excellence in
                  fitness and wellness.
                </p>
              </div>
            </div>
            <div className="col-start-3 hidden lg:flex">
              <Image
                src={`/images/exercise.webp`}
                width={500}
                height={500}
                alt="image"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
