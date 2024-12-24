import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";



const SmoothCardCarousel = ({ scrollDirection = "up", reverse = false }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);  

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight +8);
    }
  }, []);

  

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let startTime;
    const gap = 16;
    const totalCardHeight = cardHeight * cards.length + gap * cards.length;

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
  }, [cardHeight]);

  const displayCards = (arrays) => {
    return arrays.map((card, index) => (
      <div
        ref={cardRef}
        key={index}
        className={`absolute w-full`}
        style={{
          top: `${
            scrollDirection === "up" ? `${index * cardHeight}px` : `-${index * cardHeight}px`
          }`,
          left: "0",
        }}
      >
        <Image
          className="w-full h-auto object-cover"
          priority={index < 5}
          width={110}
          height={100}
          src={card.archtypeSrc}
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
          : scrollDirection === "down"
          ? displayCards([...cards, ...cards].sort(() => Math.random() - 0.5))  // warning is thrown due to math.random
          : displayCards([...cards, ...cards])}
      </div>
    </div>
  );
};

export default SmoothCardCarousel;
