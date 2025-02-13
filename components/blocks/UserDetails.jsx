export default function UserDetails(props) {
  return (
    <div className="relative min-h-[200px] lg:min-h-[300px] py-[24px]">
      <div className="center">
        <div className="container center flex-col items-center gap-y-[12px]">
          <h2 className="text-5xl font-bold">{props?.name}</h2>
          <div className="flex flex-col  max-w-[700px] py-[24px] gap-y-[24px]">
            <div className=" flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Experience and Expertise
              </h3>
              <p className="text-justify">
                Kurt is a highly qualified gym trainer with over 5 years of
                experience in personal fitness coaching. He holds certifications
                in strength training, functional fitness, and nutrition
                planning, making him a well-rounded guide for your fitness
                journey.
              </p>
            </div>
            <div className=" flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Specialized Areas
              </h3>
              <p className="text-justify">
                Weight Loss Programs: Personalized plans to help you shed extra
                pounds sustainably.. Strength Training: Build muscle and improve
                overall power with customized workouts..
              </p>
            </div>
            <div className=" flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Why Train with Kurt?
              </h3>
              <p className="text-justify">
                Kurt’s dedication to his clients’ success goes beyond just
                workouts—he’s committed to empowering individuals to build
                lasting healthy habits. Whether you’re a beginner or a seasoned
                athlete, Kurt will support and challenge you to reach your full
                potential.
              </p>
            </div>
            <h3 className=" text-black font-bold">
              Let Kurt guide you toward a healthier, stronger, and more
              confident version of yourself!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
