'use client'
import CustomButton from "@/components/GeneralComponents/CustomButton";
import Image from "next/image";
import React from "react";

export default function ErrorPage() {
  return (
    <section className="w-screen h-screen flex justify-center items-center text-center">
      <section className="flex flex-col justify-center gap-4 items-center">
    <section className="flex justify-center items-center w-full">
      <Image src={"/cat.png"} alt="error" height={250} width={250} />
    </section>
        <h1 className="font-bold text-xl">Sorry Something went wrong /_ \</h1>
        <p>We currently working on it</p>
        <CustomButton color="black" className="px-10 font-extrabold " hover>
       Back
        </CustomButton>
      </section>
    </section>
  );
}
