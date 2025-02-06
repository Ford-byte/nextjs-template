import Link from "next/link";

export default function Jumpstart() {
  return (
    <section id="jumpstart" className="relative">
      <div className="center min-h-[550px] items-center bg-[#372F2F] py-[24px]">
        <div className="container flex flex-col items-center gap-y-[62px]">
          <h2 className="text-5xl text-white text-center">
            DON’T KNOW HOW TO START? TRY OUT OUR TRAININGS.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
            <div className="space-y-[24px] bg-white p-[24px] rounded-lg">
              <h3 className="text-center text-3xl font-[500]">HIIT</h3>
              <p className="text-justify line-clamp-7 lg:line-clamp-5">
                HIIT (High-Intensity Interval Training) is a form of exercise
                that alternates between short bursts of intense activity and
                periods of lower-intensity recovery or rest. It's designed to
                maximize efficiency by providing a highly effective workout in a
                shorter time compared to traditional steady-state cardio.
              </p>
              <div className="text-center tertiary-button !bg-blue-500">
                <Link href={`/exercise/hiit`}>View Exericise</Link>
              </div>
            </div>
            <div className="space-y-[24px] bg-white p-[24px] rounded-lg">
              <h3 className="text-center text-3xl font-[500]">STRENGTH</h3>
              <p className="text-justify line-clamp-7 lg:line-clamp-5">
                Strength training, also known as resistance training, involves
                exercises designed to improve muscle strength and endurance by
                working against a resistance. This resistance can come from your
                own body weight, free weights (like dumbbells and kettlebells),
                resistance bands, or machines.
              </p>
              <div className="text-center tertiary-button !bg-blue-500">
                <Link href={`/exercise/strength`}>View Exericise</Link>
              </div>
            </div>
            <div className="space-y-[24px] bg-white p-[24px] rounded-lg">
              <h3 className="text-center text-3xl font-[500]">ENDURANCE</h3>
              <p className="text-justify line-clamp-7 lg:line-clamp-5">
                Endurance training, also known as aerobic or stamina training,
                focuses on improving the body's ability to sustain physical
                activity over extended periods. It involves exercises that
                increase your heart rate and breathing for an extended duration,
                enhancing the efficiency of your cardiovascular and respiratory
                systems.
              </p>
              <div className="text-center tertiary-button !bg-blue-500">
                <Link href={`/exercise/endurance`}>View Exericise</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
