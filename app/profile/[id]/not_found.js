"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[700px] flex flex-col items-center justify-center text-center space-y-6 p-6">
      <Image
        src="/images/user_not_found.png"
        width={500}
        height={500}
        alt="User Not Found"
        className="w-[400px] h-[400px] object-contain"
      />
      <h1 className="text-4xl font-bold text-red-600" role="alert">
        Error! User Not Found.
      </h1>
      <p className="text-lg text-gray-700 max-w-md">
        You do not have access to this page. Please return to the homepage.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        aria-label="Go back to home page"
      >
        Go Back Home
      </Link>
    </div>
  );
}
