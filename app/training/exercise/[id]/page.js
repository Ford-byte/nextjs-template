"use client";

import { useParams } from "next/navigation";
import BannerTwo from "@/components/blocks/BannerTwo";
import Excercises from "@/components/blocks/Excercise";
export default function Page() {
  const params = useParams();
  const id = params?.id;
  return (
    <>
      <BannerTwo
        header={`${id} exercises`}
        image={`/images/bg_bannerTwo.webp`}
      />
      <Excercises id={id} />
    </>
  );
}
