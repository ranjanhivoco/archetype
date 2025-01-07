import Image from "next/image";
import LinkButton from "@/components/common/LinkButton";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationStarted(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('/images/cream-bg.png')",
      }}
      className={`h-svh bg-no-repeat bg-cover flex flex-col ${
        isAnimationStarted ? "gap-20" : ""
      } items-center pt-20 pb-9`}
    >
      <Image
        className={` transition-all duration-700 ease-in-out  
        ${
          isAnimationStarted
            ? "transform translate-y-0 scale-90"
            : "transform translate-y-[30vh]  "
        }`}
        src={"/images/logo.png"}
        width={268}
        height={76}
        priority={true}
        quality={100}
        alt="of experience logo"
      />

      <div
        className={`flex flex-1 flex-col gap-y-36 items-center transition-opacity duration-1000 ease-in-out
          ${isAnimationStarted ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex flex-1 flex-col items-center">
          <Image
            className=""
            src={"/images/bulb.png"}
            width={184}
            height={185}
            priority={true}
            alt="of experience logo"
          />
          
          <p className="text-black  text-lg leading-6 font-semibold  text-center">
            Interpret your career with our <br /> Career Archetype Quiz
          </p>
        </div>

        <LinkButton title={"NEXT"} href={"/archetype"} className={"h-[46px] uppercase"} />
      </div>
    </div>
  );
}
