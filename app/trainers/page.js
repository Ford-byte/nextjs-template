"use client";

import useApiStorage from "@/components/store/api";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState, useEffect, useCallback } from "react";

function TrainerData() {
  const { getTrainerData } = useApiStorage();
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getTrainerData();
      setData(response?.data || []);
    } catch (error) {
      console.log("Error fetching trainer data:", error);
    }
  }, [getTrainerData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container min-h-[500px] py-12">
      <div className="grid grid-cols-2">
        {data &&
          data.map((item, index) => {
            return (
              <div
                className="rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 w-full"
                key={index}
              >
                <Image
                  src={
                    `/uploads/${item?.profile}` ||
                    "https://source.unsplash.com/random/300x300/?2"
                  }
                  alt={item.title || "Image"}
                  width={500}
                  height={500}
                  className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                />
                <div className="flex flex-col justify-between p-6 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide uppercase">
                      {item?.fullname || "Donec lectus leo"}{" "}
                    </h2>
                    <p className="dark:text-gray-800">
                      {item.description ||
                        "Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget."}{" "}
                    </p>
                  </div>
                  <Link
                    href={`/trainers/form/${item?.id}`}
                    type="button"
                    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide text-xl secondary-button"
                  >
                    APPLY
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="center pt-[100px]">
      <Suspense fallback={<div>Loading trainer data...</div>}>
        <TrainerData />
      </Suspense>
    </div>
  );
}
