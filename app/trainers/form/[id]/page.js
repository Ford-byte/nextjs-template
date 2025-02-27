"use client";
import ApplicationForm from "@/components/forms/applicaitonForm";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return (
    <div className="center">
      <div className="container">
        <div className="min-h-[500px] pt-[100px]">
          <h2 className="text-4xl py-[24px] uppercase font-[700] text-center tracking-widest">
            APPLICATION FORM
          </h2>
          <ApplicationForm id={id} />
        </div>
      </div>
    </div>
  );
}
