import React, { useState, useRef, useEffect } from "react";
import { Pause, Play, Volume2, VolumeX, Reply, RefreshCcw, SkipForward } from "lucide-react";
// import LinkButton from "./LinkButton";

const InstagramStoryPlayer = ({
  animationNumber,
  setAnimationNumber,
  videoSrc='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  // videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4",
  onReply, // Optional callback for reply action
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  const [isLoaded,setIsLoaded]=useState(false)

  const resetVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setProgress(0);
      setIsVideoEnded(false);
      setIsPlaying(true);
    }
  };


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const updateProgress = () => {
      if (video.duration && isPlaying) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);

        // Check if video has ended
        if (progressPercent >= 100) {
          setIsVideoEnded(true);
          setIsPlaying(false);
        }
      }
    };

    // Set up progress tracking interval
    progressIntervalRef.current = setInterval(updateProgress, 100);

    // Autoplay and pause logic
    if (isPlaying && !isVideoEnded) {
      video.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }

    // Handle video end event as a fallback
    const handleVideoEnd = () => {
      setIsVideoEnded(true);
      setIsPlaying(false);
      // setAnimationNumber((prev) => prev + 1);
    };
    video.addEventListener("ended", handleVideoEnd);

    return () => {
      // Clean up interval when component unmounts or deps change
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [isPlaying, videoSrc, isVideoEnded]);

  const togglePlayPause = () => {
    if (isVideoEnded) return; // Prevent play if video has ended
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReply = () => {
    if (onReply) {
      onReply();
    }
  };

  useEffect(() => {
    if (isVideoEnded) {
      setAnimationNumber((prev) => prev + 1);
    }
  }, [isVideoEnded]);

  useEffect(()=>{
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  },[])

  return (
    <div
      // style={{
      //   background: "linear-gradient(to left, #F28B55, #B40C0B)",
      // }}
      className={`relative h-svh w-full bg-black
                transform transition-all duration-1000 ease-in-out 
                ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale"}
        `}
    >
      {/* Progress Bar */}
      <div className="absolute top-2 left-0 right-0 z-10 px-2">
        <div className="h-2 bg-[#8D8D8D]/50 rounded-3xl overflow-hidden">
          <div
            className="h-full bg-cream rounded-3xl"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          ></div>
        </div>
      </div>

      {/* Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-contain"
        playsInline
        muted={isMuted}
      />

      {/* Central Play/Pause Overlayed */}
      {!isVideoEnded && (
        <div
          onClick={togglePlayPause}
          className="absolute inset-0 z-20 flex items-center justify-center "
        >
          {!isPlaying && (
            <div className="bg-black/50 p-4 rounded-full">
              <Play color="white" size={40} />
            </div>
          )}
        </div>
      )}

      {/* Mute Button on Right  */}
      {/* border border-black */}
      {/* top-1/2 -translate-y-1/2 */}
      <div className="absolute bottom-28 flex flex-col right-5 z-30  gap-y-4">
        {/* flex flex-col justify-between items-center */}

        {/* show is archetype , not in know more  */}
        {animationNumber > 0 && (
          <button
            onClick={() => setAnimationNumber((prev) => prev + 1)}
            className="bg-black/50 p-3 rounded-full"
          >
            <SkipForward color="white" />
          </button>
        )}

        <button onClick={toggleMute} className="bg-black/50 p-3 rounded-full">
          {isMuted ? <VolumeX color="white" /> : <Volume2 color="white" />}
        </button>
      </div>
    </div>
  );
};

export default InstagramStoryPlayer;
