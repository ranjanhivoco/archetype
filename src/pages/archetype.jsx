import CareerArchetype from "@/components/common/CareerArchType";
import InstagramStoryPlayer from "@/components/common/InstagramStoryPlayer";
import LinkButton from "@/components/common/LinkButton";
import LottiePlayer from "@/components/common/LottieAnimation";
import SmoothCardCarousel from "@/components/common/SmoothCardCarousel";
import Image from "next/image";
import { useEffect, useState } from "react";

const Archetype = () => {
  const [animationNumber, setAnimationNumber] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationNumber(
        animationNumber < 3 ? animationNumber + 1 : animationNumber
      );
    }, 2.5* 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div
      className={`bg-cream h-svh w-full  flex flex-col gap-y-9 
         ${animationNumber !== 2 ? "pt-14 " : ""} `}
    >
      {animationNumber !== 2 && (
        <h1 className="text-black  text-5xl font-bold  tracking-[0.01em] text-left px-5 ">
          Career
          <br />
          Archetype
        </h1>
      )}

      {/* <section> */}
      {animationNumber === 2 && (
        // <div className="h-svh w-full">
        <InstagramStoryPlayer 
        videoSrc={'https://careerarchetypes.s3.ap-south-1.amazonaws.com/videos/Intro_Video.mp4'}
        setAnimationNumber={setAnimationNumber} 
        animationNumber={animationNumber}

        />
        
        // </div>
      )}
      {/* <CareerArchetype /> */}

      {animationNumber !== 2 && (
        <div className="relative w-full flex-1 min-h-[80%]  overflow-hidden flex items-center justify-center gap-x-4 px-5">
          {animationNumber === 3 && (
            <div className="absolute inset-0 bg-cream/60 z-10"></div>
          )}

          <SmoothCardCarousel reverse={false} scrollDirection="up" />
          <SmoothCardCarousel scrollDirection="down" reverse={false} />
          <SmoothCardCarousel reverse={true} scrollDirection="up" />
        </div>
      )}

      {animationNumber === 3 && (
        <LinkButton
          href={"/quiz"}
          title={"START QUIZ"}
          className={
            "uppercase absolute bottom-9 -translate-x-1/2 left-1/2 z-20"
          }
        />
      )}

      {/* </section> */}
    </div>
  );
};

export default Archetype;
