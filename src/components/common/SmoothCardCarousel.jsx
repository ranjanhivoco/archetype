import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const SmoothCardCarousel = ({ scrollDirection = "up", reverse = "false" }) => {
  
  const cards = [
    { archtypeSrc: "/images/archtypes/The_Artist_2.png" },
    { archtypeSrc: "/images/archtypes/The_Harmoniser_2.png" },
    { archtypeSrc: "/images/archtypes/The_Sage_2.png" },
    { archtypeSrc: "/images/archtypes/The_Ruler_2.png" },
    { archtypeSrc: "/images/archtypes/The_Protagonist_2.png" },
    { archtypeSrc: "/images/archtypes/The_Visionary_2.png" },
    { archtypeSrc: "/images/archtypes/The_Strategist_2.png" },
    { archtypeSrc: "/images/archtypes/The_Explorer_2.png" },
    { archtypeSrc: "/images/archtypes/The_Indomitable_Spirit_2.png" },
    { archtypeSrc: "/images/archtypes/The_Maverick_2.png" },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let startTime;
    const cardHeight = 188; // Pixels (matching h-64)
    const gap = 16; // Gap between cards in px
    const totalCardHeight = cardHeight * 10 + gap * 10;
    const scrollSpeed = 0.1; // Pixels per millisecond

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const totalScroll = elapsed * scrollSpeed;
      const currentScroll = totalScroll % totalCardHeight;

      if (scrollDirection === "up") {
        container.style.transform = `translateY(-${currentScroll}px)`;
      } else {
        container.style.transform = `translateY(${currentScroll}px)`;
        container.style.bottom = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const displayCards = (arrays) => {
    return arrays.map((card, index) => (
      <div
        key={index}
        className={`absolute w-full`}
        style={{
          top: `${
            scrollDirection === "up" ? `${index * 300}px` : `-${index * 300}px`
          }`,
          left: "0",
        }}
      >
        <Image
          className="w-full h-auto "
          priority={true}
          src={card.archtypeSrc}
          width={110}
          height={100}
          alt="Archetype image"
        />
      </div>
    ));
  };
  return (
    <div className="relative w-full h-full flex  justify-center overflow-hidden ">
      <div
        ref={containerRef}
        className="absolute w-full flex items-center justify-center"
      >
        {reverse
          ? displayCards([...cards, ...cards].reverse())
          : displayCards([...cards, ...cards])}
      </div>
    </div>
  );
};

export default SmoothCardCarousel;
