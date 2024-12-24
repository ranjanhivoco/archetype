"use client";

import QuizComponent from "@/components/common/QuizComponent";
import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import initialQuestions from "../../assets/questions";
import { useRouter } from "next/router";


const CardSwiper = ({ step,setStep,setIsLoading }) => {
  const [questions, setQuestions] = useState(null);
  const [result,setResult] =useState([])  

  const [currentIndex, setCurrentIndex] = useState(initialQuestions.length - 1);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);    
  const router = useRouter();
  
  

  const URL='https://backend.hivoco.com/quiz/questions'
  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setQuestions(result);
    } catch (error) {
      setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  async function postData( data) {
    try {
      setIsLoading(true)
      const response = await fetch(
        "https://backend.hivoco.com/quiz/calculate-result",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      
      setIsLoading(false)

      result &&
        router.push({
          pathname: "/result",
          query: { data: encodeURIComponent( JSON.stringify(result.archedata)) },
        });
  

      console.log('Success:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (result.length === 11) {
      postData(result);
    }
  }, [result]);
  
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
    // setStep(step + 1);
    step !== 11 && triggerSwipe("left", index); // if eleven then its the last card
  };

  return (
    //this div  takes the rest of the page
    <div
      // onClick={(e) => e.stopPropagation()}
      className="w-full h-full overflow-hidden "
    >
      <div className="w-full h-full  ">
        {/* this div  takes the rest of the page */}
        {questions?.map((question, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={` absolute w-full h-3/5 swipe overflow-hidden z-0  `} // this abolute keeps them stacked
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
              //  first question will be on top brother
              // style={{ zIndex: initialQuestions.length - index }}
              className="h-full w-full px-7 rounded-xl overflow-hidden "
            >
              <QuizComponent
                step={step}
                setStep={setStep}
                ques={question}
                onClick={() => handleOptionClick(index)}
                onTouchEnd={() => handleOptionClick(index)}
                result={result}
                setResult={setResult}
              />
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default CardSwiper;
