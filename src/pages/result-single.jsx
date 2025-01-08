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

  console.log(object);
  

  useEffect(() => {
    if (data?.length <= 0) {
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
    <div className="bg-off-white text-black h-svh px-6 w-full flex flex-col justify-evenly gap-y-3 overflow-hidden">
      {/* pt-10 pb-9 */}
      {/* gap-y-4 */}
      {/* border border-black  */}
      {/* header section */}

      {/* <div className="flex flex-col w-full h-full flex-1 justify-between"> */}
      <div className="flex flex-col gap-y-8  ">
        {/* mb-3 */}
        <div className="flex gap-x-2 items-center">
          <Link href={"/quiz"}>
            <ArrowLeft size={24} />
          </Link>

          <span className="text-base font-medium text-left self-center">
            Your Career Archetype
          </span>
        </div>

        <h2
          className={`text-base font-bold text-left transition-opacity duration-1000 ${firstAnimationClass}`}
        >
          You are a blend of:
        </h2>
      </div>

      {/* single Archetype result */}

      <div className="flex flex-col rounded-3xl relative w-full  min-h-[16.25rem]  aspect-[1.25] flex- px-2 ">
        <div
          className={`relative z-20 w-full h-full flex items-center flex1 transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "-translate-x-52"}
          `}
        >
          <p className="overflow-x-scroll self-end  whitespace-nowrap font-Edo text-left text-[2rem] leading-9 font-normal uppercase text-white">
            {object[0]?.title.replace(/\bthe\b/g, "") || "explorer"}
          </p>

          <Image
            className="h-full w-full object-contain overflow-hidden flex-1"
            width={117}
            height={255}
            src={object[0]?.image || ""}
            alt="archetype image"
            priority={true}
          />

          <div className="absolute bottom-0 left-0 right-0 h-[55%] z-[-10]">
            {/* Gradient background with rounded top corners */}
            <div
              style={{
                backgroundColor: `${object[0]?.color} `,
              }}
              className="absolute inset-0  rounded-t-3xl"
            />
          </div>
        </div>

        <div
          style={{ backgroundColor: `${object[0]?.color}` }}
          className="flex flex-1 rounded-b-3xl h-full"
        >
          <p
            className={`w-full  bottom-0 font-medium text-sm leading-tight text-white  px-4 pt-3 pb-5 
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

      {/* Footer section */}
      <div className=" bottom-9  left-0  w-full flex flex-col  gap-y-10">
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
          href={"/know-more"}
          className={`transition-transform duration-1000 h-[46px] w-full
                    ${animationCounter >= 3? "translate-y-0": "translate-y-[280%]"}
        `}
        />
      </div>
    </div>
  );
};

export default Result;
