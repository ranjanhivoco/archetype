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
      <div className="bg-off-white text-black h-svh px-6 w-full pt-10 flex flex-col gap-y-4 overflow-hidden">
        {/* header section */}

        <div className="flex flex-col w-full h-full flex-1 justify-between">
          <div className="flex flex-col gap-y-8 mb-3">
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

          {/* main content */}
            <div className="flex flex-col self-center ">
            <div className="relative border border-black flex- mb-[] w-full  flex flex-col gap-y- justify-center ">
              {/* contents div non Gradient part */}
              <div className="flex border border-black relative z-10 w-full mx-auto min-h-[16.25rem]  aspect-[1.25] flex-1 px-2 ">

                {/* left side text and image */}
                <div
                  className={`w-1/2 h-full flex flex1 transition-transform duration-1000
            ${animationCounter >= 1 ? "translate-x-0" : "-translate-x-52"}
          `}
                >
                  <p
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                    }}
                    className="font-Edo h-1/2 self-end text-right text-xl leading-6 font-normal uppercase text-white whitespace-nowrap "
                  >
                    {/* overflow-y-auto */}
                    {object[0]?.title.replace(/\bthe\b/g, "") || "explorer"}
                  </p>

                  <Image
                    className="h-full w-full object-contain overflow-hidden flex-1"
                    width={117}
                    height={255}
                    src={object[0]?.image || ""}
                    alt="left archetype image"
                    priority={true}
                  />
                </div>

                {/*Center waala logo */}
                <Image
                  // className="absolute  self-center mt-28  left-1/2 -translate-x-1/2"
                  className="self-center mt12 relative -bottom-[10%] flex-1"
                  width={66}
                  height={67}
                  src={"/images/icons/blend-icon.png"}
                  alt="blend icon"
                />

                {/* right side div and image */}
                <div
                  className={`w-1/2 h-full flex flex1 transition-transform duration-1000 
                       ${
                         animationCounter >= 2
                           ? "translate-x-0"
                           : "translate-x-[120%]"
                       }
            `}
                >
                  <Image
                    className="h-full w-full object-contain overflow-hidden "
                    width={117}
                    height={255}
                    src={
                      object[1]?.image ||
                      "https://s3-alpha-sig.figma.com/img/cc67/3930/4a1cfbd86ee2a31801a50fe8f00ccd1d?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MuV0qNv5AtdCAUFj-kVyMkck5vFzI1NKOG4JpF7Es-SVC4Sjjh5BbYN5iLrGTjU~NWQc6p10VzlH9zB8fdrl7pgbUa-iTX4H~7Mmc88HrjKbdwIn-12IfV~Rex5y-m0QM~5kvu5IDca7R930R1PlvUQcZdgjb6biTThWYZcGYi9nAX8kHGQyld99-q1TFBV4Xy3KgrgQ5RoFF~3WCKqazy6DSXGGkip4ePyIE9mUW8kPJCkBF3IN9q-RtP8Q6DvgBSAv4Hrae2FU0L97SoPKt2xmKfnu4nIKeOC5O35dcZ2Ut9TE~ceG3vWynuUKsRNvc5-d~iVxhgWUpOdPtbn7wg__"
                    }
                    alt="right archetype image"
                    priority={true}
                  />

                  <p
                    style={{
                      writingMode: "vertical-rl",
                    }}
                    className="font-Edo  text-xl leading-6 h-1/2 self-end text-left font-normal uppercase text-white whitespace-nowrap	"
                  >
                    {object[1]?.title.replace(/\bthe\b/g, "") || "explorer"}
                  </p>
                </div>
              </div>

              {/* gradient wala div  */}
              {/* <div
          className={`z-0 border border-black absolute w-full flex -translate-x-1/2 min-h-[15.63rem] aspect-[1.3] flex-1 -bottom-[40%] left-1/2 rounded-3xl transition-opacity ${firstAnimationClass}`}
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
            className={`absolute w-full  bottom-0 font-medium text-sm leading-tight text-white  px-4 pt-4 pb-5 
          transition-transform duration-1000
          ${animationCounter >= 3 ? "translate-y-0" : "translate-y-[130%]"}
          `}
          >
            A unique combination, this allows you to have an informed and
            prepared approach your career, while keeping passion curiosity in
            the forefront
          </p>
        </div> */}

              {/* new gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-[55%]">
                {/* Gradient background with rounded top corners */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-purple-400 to-purple-800 rounded-t-3xl" />
              </div>
            </div>

            <div className="flex flex-1 bg-gradient-to-r from-orange-300 via-purple-400 to-purple-800 rounded-b-3xl  h-full">
              <p
                className={`w-full flex-1 bottom-0 font-medium text-sm leading-tight text-white  px-4 pt-3 pb-5 
          transition-transform duration-1000
          ${animationCounter >= 3 ? "translate-y-0" : "translate-y-[130%]"}
          `}
              >
                A unique combination, this allows you to have an informed and
                prepared approach your career, while keeping passion curiosity
                in the forefront
              </p>
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className=" bottom-9 mb-9 left-0  w-full flex flex-col gap-y-10 ">
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
