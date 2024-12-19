import { useCallback, useState } from "react";

const QuizComponent = ({ step, ques, onClick, onTouchEnd }) => {
  const handleAction = (fn, index) => {
    setTimeout(() => {
      fn();
    }, 500);
    setSelectedOptionIndex(index);
  };

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  return (
    <div className="h-full w-full relative overflow-hidden ">
      <div className={`overflow-hidden h-[97%] w-full bg-milk-white rounded-xl text-black-coffee px-5 pt-[13%]  pb-5`}>
        <h1 className="text-sm font-semibold mb-[11%] text-left">
          Q{step}. {ques.question}
        </h1>
        <ul aria-labelledby="question" className="flex flex-col gap-y-3">
          {ques.options.map((option, index) => {
            return (
              <li className="pressable" key={index}>
                <button
                  role="option"
                  aria-selected={selectedOptionIndex === index}
                  onClick={(e) => {
                    handleAction(onClick, index);
                    // e.preventDefault()
                  }}
                  onTouchEnd={(e) => {
                    handleAction(onTouchEnd, index);
                    // e.preventDefault()
                  }}
                  className={`pressable w-full  text-xs font-normal text-left px-4 py-3 rounded-xl transition-colors border
                  ${
                    selectedOptionIndex === index
                      ? " border-[#00A55C]/20 bg-[#00A55C]/10 active:ring-2 active:ring-[#00A55C]/20"
                      : "border-black/25"
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* farther div */}
      {step <= 9 && (
        <div className="absolute w-[85%] h-5  left-1/2 bottom-0 bg-white/5  rounded-b-xl  z-10  transform -translate-x-1/2"></div>
      )}
      {step<=10 &&
        <div className="absolute w-[90%] h-5  left-1/2 bottom-2 bg-white/10 rounded-b-xl  z-30 transform -translate-x-1/2"></div>
      }
      {/* closer div */}
    </div>
  );
};

export default QuizComponent;
