import BigCalendar from "@/components/blocks/BigCalendar";

export default function Page() {
  return (
    <div className="min-h-[700px] pt-[100px]">
      <div className="center">
        <div className="container py-[24px]">
          <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-between pb-4 border-bottom">
              <div className="flex items-center">
                <div className="mb-0 dark:text-gray-800 uppercase text-xl tracking-widest">
                  HIIT training
                </div>
              </div>
              <div className="tertiary-button">INQUIRE</div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <img
                  src="https://source.unsplash.com/random/480x360/?4"
                  alt=""
                  className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                />
              </div>
              <div className="space-y-2">
                <a rel="noopener noreferrer" href="#" className="block">
                  <h3 className="text-xl font-semibold dark:text-violet-600 uppercase">
                    BOSS lucio cabrera
                  </h3>
                </a>
                <p className="leading-snug dark:text-gray-600">
                  HIIT (High-Intensity Interval Training) is a workout method
                  that alternates between short bursts of intense exercise and
                  brief periods of rest or low-intensity activity. It is highly
                  effective for muscle conditioning, fat loss, and
                  cardiovascular improvement.
                </p>
              </div>
            </div>
          </div>
          <div className="py-[24px] shadow-lg">
            <BigCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
