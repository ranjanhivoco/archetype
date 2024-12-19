"use client";

import QuizComponent from "@/components/common/QuizComponent";
import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import initialQuestions from "../../assets/questions";

const CardSwiper = ({ step, setStep }) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(initialQuestions.length - 1);

  const childRefs = useMemo(
    () =>
      Array(initialQuestions.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  // Unified swipe logic
  const triggerSwipe = async (direction, index) => {
    const currentCard = childRefs[index]?.current;
    if (currentCard) {
      await currentCard.swipe(direction); // Trigger animation
      setQuestions((prevQuestions) =>
        prevQuestions.filter((_, idx) => idx !== index)
      );
      setCurrentIndex((prev) => prev - 1); // Update current index
    }
  };

  // swipe left logic for both touch and click
  const handleOptionClick = (index) => {
    setStep(step + 1);
    step !== 11 && triggerSwipe("left", index); // if eleven then its the last card
  };

  const [state, setState] = useState(0);

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full h-full overflow-hidden ">
      <div className="w-full h-full ">
        {questions.map((question, index) => (
          <TinderCard
            ref={childRefs[index]}
            // ${step===index+1 ?"":"hidden"}
            className={` absolute  w-full h-3/5 swipe  overflow-hidden `}
            swipeRequirementType="position"
            swipeThreshold={1000}
            // onCardLeftScreen={() => setStep( step + 1)}
            key={index}
            onSwipe={() => {
              return false;
            }}
            // preventSwipe={["left", "right", "up", "down"]} // Prevent all user swipes
          >
            <div
              style={{ zIndex: initialQuestions.length - index }}
              className="relative h-full w-full px-7 rounded-xl overflow-hidden transform  transition-transform duration-0"
            >
              <QuizComponent
                step={step}
                ques={question}
                onClick={() => handleOptionClick(index)}
                onTouchEnd={() => handleOptionClick(index)}
              />
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default CardSwiper;
