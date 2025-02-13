"use client";

import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-[700px] flex flex-col items-center justify-center text-center space-y-4">
      <Image
        src="/images/noentry.png"
        width={500}
        height={500}
        alt="Access Denied"
        className="w-[500px] h-[200px] object-cover"
      />
      <h1 className="text-4xl font-bold text-red-600">Error!</h1>
      <p className="text-lg text-gray-700">
        You do not have access to this page. Please{" "}
        <Link href="/" className="text-blue-500 hover:underline">
          go back
        </Link>{" "}
        to the home page and log in.
      </p>
    </div>
  );
}
