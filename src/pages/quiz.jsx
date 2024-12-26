import CardStack from "@/components/common/CardStack";
import LottieAnimation from "@/components/common/LottieAnimation";
import ProgressBar from "@/components/common/ProgressBar";
import QuizComponent from "@/components/common/QuizComponent";
import TinderCardStack from "@/components/common/TinderCardStack";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="h-svh bg-dark-brown relative pt-14 w-full flex flex-col overflow-hidden">
      {/* main quiz ui */}
      <div className="flex flex-col gap-y-10 w-full h-full ">
        <section className="flex flex-col gap-y-10 w-full  px-7  ">
          <div className=" flex  w-full justify-center items-center text-white relative ">
            <Link className="absolute left-0" href={"/archetype"}>
              <ArrowLeft size={24} />
            </Link>

            <p className=" text-base font-bold text-left self-center ">
              {step > 11 ? 11 : step} of 11
            </p>
          </div>

          <ProgressBar step={step} />
        </section>

        {/* quiz question cards stacked  */}
        <CardStack step={step} setStep={setStep} setIsLoading={setIsLoading} />
      </div>

      {/* z index 0 */}
      <Image
        className="absolute z-0 w-full h-auto  bottom-0 left-1/2 -translate-x-1/2"
        priority={true}
        src={"/images/quiz-bottom-part.png"}
        height={84}
        width={335}
        alt="flash,stars image"
      />

      {/* Overlay and Blur effect when quiz ends  */}
      {step === 12 && (
        <div className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm"></div>
      )}

      {/* lottie animation over the blur  when quiz ends z 50 */}
      {isLoading && <LottieAnimation />}
    </div>
  );
};

export default Quiz;
