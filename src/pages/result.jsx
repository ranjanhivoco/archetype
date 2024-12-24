import LinkButton from "@/components/common/LinkButton";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Result = () => {
  const [animationCounter, setAnimationCounter] = useState(0);
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
      <div className="relative flex-1  mb-44 w-full  flex">
        
        {/* contents div non Gradient part */}
        <div className="flex z-10 w-[90vw] mx-auto h-[70%] relative">
          {/* left side text and image */}
          <div
            className={`pl-1 w-full  h-full flex flex-1 items-end transition-transform duration-1000
           ${animationCounter >= 1 ? "translate-x-0" : "-translate-x-52"}
          `}
          >
            <p
              style={{
                transform: "rotate(180deg)",
                writingMode: "vertical-rl",
              }}
              className="font-Edo mb-8 text-xl font-normal text-left uppercase text-white -mr-4"
            >
              EXPLORER
            </p>

            <img
              width={117}
              height={255}
              src={`
                https://s3-alpha-sig.figma.com/img/cc67/3930/4a1cfbd86ee2a31801a50fe8f00ccd1d?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MuV0qNv5AtdCAUFj-kVyMkck5vFzI1NKOG4JpF7Es-SVC4Sjjh5BbYN5iLrGTjU~NWQc6p10VzlH9zB8fdrl7pgbUa-iTX4H~7Mmc88HrjKbdwIn-12IfV~Rex5y-m0QM~5kvu5IDca7R930R1PlvUQcZdgjb6biTThWYZcGYi9nAX8kHGQyld99-q1TFBV4Xy3KgrgQ5RoFF~3WCKqazy6DSXGGkip4ePyIE9mUW8kPJCkBF3IN9q-RtP8Q6DvgBSAv4Hrae2FU0L97SoPKt2xmKfnu4nIKeOC5O35dcZ2Ut9TE~ceG3vWynuUKsRNvc5-d~iVxhgWUpOdPtbn7wg__
                `}
              className="h-full w-auto"
              alt="Image"
            />
          </div>

          {/* continue logo */}
          <Image
            className="self-center -mb-8 h-1/4 w-auto "
            width={66}
            height={67}
            src={"/images/icons/blend-icon.png"}
            alt="blend icon"
          />

          {/* right side div and image */}
          <div
            className={`pr-3  flex flex-1 items-end  transition-transform duration-1000
                       ${
                         animationCounter >= 2
                           ? "translate-x-0"
                           : "translate-x-48"
                       }
            `}
          >
            <img
              width={117}
              height={255}
              src={`
                https://s3-alpha-sig.figma.com/img/dd46/d539/0f89514a6f57d5aee2c9a3ed5827589b?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MKRa3uFjRaPUBmLFfm0AHjPoaP-GI3Td2ewoKQx3W-Bj4PBfdrvOylxMhZi-6zwXhnpcQI5ZmBpr5Fk~Qjehw1cnqKriTkzY2pgnwrggOI6mAU1AJ7JuPZdcRp1iK84V17idmnkPYUU5kias-W9ZDZO2U5Rn2GkEcJ4sUx-dmYH7ug0LmFq37yZ7tgBVrwna5L-0H0TK6VlpKjKZNt~id~C6zeR-iJTvPeeetEEJ0Ny6Upe3k0acnvQ99BeErxIrQN0qzwrWxSQUJYIILDBYMrgaepgQAqrUHlXM-lF926w-6q67bL2JCp3Mc1KA19BnJCXdWICB4t6LCzyGF372EQ__
                `}
              className="h-full w-auto"
              alt="Image"
            />

            <p
              style={{
                writingMode: "vertical-rl",
              }}
              className="mb-8 font-Edo  text-xl font-normal text-left uppercase text-white -ml-4"
            >
              EXPLORER
            </p>
          </div>
        </div>

        {/* gradient wala div  */}
        <div
          className={`z-0 absolute w-full flex -translate-x-1/2  top-20 bottom-2 left-1/2 rounded-3xl border-2 border-white transition-opacity ${firstAnimationClass}`}
          style={{
            transitionDuration: "1s", // Adjust the duration here
            background:
              animationCounter >= 1
                ? "linear-gradient(90deg, #F0B30E 0%, #7F87DA 100%)"
                : "none",
          }}
        >
          <p
            className={`absolute w-full   bottom-0 font-medium text-center  text-sm text-white  p-5
          
          transition-transform duration-1000
          ${animationCounter >= 3 ? "translate-y-0" : "translate-y-full"}
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
