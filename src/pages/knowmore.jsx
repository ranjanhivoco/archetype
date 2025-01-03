import InstagramStoryPlayer from "@/components/common/InstagramStoryPlayer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const KnowMore = () => {
  const [animationNumber, setAnimationNumber] = useState(0);
  const router =useRouter()
  
  useEffect(() => {
    if (animationNumber === 1) {
      router.push("/signup");
    }
  }, [animationNumber]);


  return (
    <div className="h-svh w-full">
      <InstagramStoryPlayer
        videoSrc={
          "https://careerarchetypes.s3.ap-south-1.amazonaws.com/videos/The_Artist.mp4"
        }
        setAnimationNumber={setAnimationNumber}
        animationNumber={animationNumber}
      />
    </div>
  );
};

export default KnowMore;
