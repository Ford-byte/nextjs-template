import Image from "next/image";

export default function TraineeList({ trainee }) {
  return (
    <div className="grid grid-cols-3 gap-12 min-h-[300px] py-12">
      {trainee &&
        trainee?.map((item, index) => {
          return (
            <div
              className="bg-gray-200 flex flex-col gap-y-[12px] h-full p-4 shadow-lg"
              key={index}
            >
              <div className="flex">
                <Image
                  src={`/uploads/${item?.profile}`}
                  width={200}
                  height={200}
                  alt="profile"
                  className="h-[200px] w-[200px] object-cover"
                />
                <div className="flex flex-col pl-4">
                  <h2>
                    <strong>Name:</strong> {item?.fullname || "No name set"}
                  </h2>
                  <h2>
                    <strong>Age:</strong> {item?.age}
                  </h2>
                  <h2>
                    <strong>Contact:</strong> {item?.contact}
                  </h2>
                  <h2>
                    <strong>Emergency Dial:</strong> {item?.emergency_person}
                  </h2>
                  <h2>
                    <strong>Emergency Number:</strong> {item?.emergency_number}
                  </h2>
                </div>
              </div>
              <div className="">
                <h3 className="">Have you trained before?</h3>
                <p className="">
                  {item?.question_1}, <strong>{item?.question_2 || ""}</strong>
                </p>
                <h3 className="">
                  Do you have any pre-existing injuries or conditions?
                </h3>
                <p className="">
                  {item?.question_3}, <strong>{item?.question_4 || ""}</strong>
                </p>
                <h3 className="">What is your primary reason for training?</h3>
                <p className="">{item?.question_5}</p>
                <h3 className="">How many times per week can you train?</h3>
                <p className="">{item?.question_6}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
