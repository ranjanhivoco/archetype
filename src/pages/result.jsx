import LinkButton from "@/components/common/LinkButton";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Result = () => {
  const [animationCounter, setAnimationCounter] = useState(0);

  const router = useRouter();
  const { data } = router.query;
  const object = data ? JSON.parse(decodeURIComponent(data)) : [];  

  useEffect(() => {
    if (data?.length<=0) {
      router.back();
    }
  }, [data?.length]);

  const firstAnimationClass =
    animationCounter >= 1 ? "opacity-100" : "opacity-0";

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationCounter((prev) => {
        if (prev >= 3) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-off-white text-black h-svh px-[5%] w-full pt-[11%] flex flex-col gap-y-3 overflow-hidden">
      {/* back btn  and the h2  */}
      {/* use  later on */}

      <div className="flex flex-col gap-y-8 ">
        <div className="flex gap-x-2 items-center">
          <Link href={"/quiz"}>
            <ArrowLeft size={24} />
          </Link>

          <span className="text-xl font-medium text-left self-center">
            Your Career Archetype
          </span>
        </div>

        <h2
          className={`text-base font-bold text-left transition-opacity duration-1000 ${firstAnimationClass}`}
        >
          You are a blend of:
        </h2>
      </div>

      {/* main content */}

      <div className="relative flex-1  mb-[11.25rem] w-full  flex justify-center">
        {/* contents div non Gradient part */}
        <div className="flex z-10 w-full mx-auto h-[71.5%] relative px-3">
          {/* left side text and image */}
          <div
            className={`w-1/2 h-full flex flex-1 transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "-translate-x-52"}
          `}
          >
            <p
              style={{
                transform: "rotate(180deg)",
                writingMode: "vertical-rl",
              }}
              className="font-Edo h-1/2 self-end text-right text-xl font-normal uppercase text-white whitespace-nowrap	"
            >
              {object[0]?.title.replace(/\bthe\b/g, "") || "explorer"}
            </p>

            <Image
              className="h-full w-full object-contain overflow-hidden"
              width={117}
              height={255}
              src={object[0]?.image || ""}
              alt="left archetype image"
              priority={true}
            />
          </div>

          {/* continue logo */}
          <Image
            className="absolute  self-center mt-28  left-1/2 -translate-x-1/2"
            // -mr-5
            width={66}
            height={67}
            src={"/images/icons/blend-icon.png"}
            alt="blend icon"
          />

          {/* right side div and image */}
          <div
            className={`w-1/2  h-full flex flex-1 transition-transform duration-1000 
                       ${
                         animationCounter >= 2
                           ? "translate-x-0"
                           : "translate-x-52"
                       }
            `}
          >
            <Image
              className="h-full w-full object-contain overflow-hidden "
              width={117}
              height={255}
              src={object[1]?.image || ""}
              alt="right archetype image"
              priority={true}
            />

            <p
              style={{
                writingMode: "vertical-rl",
              }}
              className="font-Edo  text-xl h-1/2 self-end text-left font-normal uppercase text-white whitespace-nowrap	"
            >
              {object[1]?.title.replace(/\bthe\b/g, "") || "explorer"}
            </p>
          </div>
        </div>

        {/* gradient wala div  */}
        <div
          className={`z-0 absolute w-full flex -translate-x-1/2    h-[71.5%] bottom-4 left-1/2 rounded-3xl transition-opacity ${firstAnimationClass}`}
          style={{
            transitionDuration: "1s", // Adjust the duration here
            background:
              animationCounter >= 1
                ? `linear-gradient(90deg, ${
                    object[0]?.color || "#F0B30E"
                  } 0%,  ${object[1]?.color || "#7F87DA"} 100%)`
                : "none",
          }}
        >
          <p
            className={`absolute w-full   bottom-0 font-medium   text-sm text-white  px-5 my-5 
          
          transition-transform duration-1000
          ${animationCounter >= 3 ? "translate-y-0" : "translate-y-[130%]"}
          `}
          >
            A unique combination, this allows you to have an informed and
            prepared approach your career, while keeping passion curiosity in
            the forefront
          </p>
        </div>
      </div>

      {/* bottom h2 and routing btn */}
      <div className=" absolute z-0 flex-1 bottom-9 left-0 px-5 w-full flex flex-col gap-y-10">
        <h2
          className={`text-lg   font-bold text-left
          transition-opacity duration-1000
          ${animationCounter >= 3 ? "opacity-100" : "opacity-0"}
          `}
        >
          Where curiosity <br /> meets strategy, passion thrives.
        </h2>

        <LinkButton
          title={"Know More"}
          href={"/knowmore"}
          className={`transition-transform duration-1000 h-[46px] w-full
                    ${
                      animationCounter >= 3 ? "translate-y-0" : "translate-y-24"
                    }
                    `}
        />
      </div>
    </div>
  );
};

export default Result;
