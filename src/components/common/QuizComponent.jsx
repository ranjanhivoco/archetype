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
      {/* main content */}
      <div
        className={`overflow-hidden flex flex-col gap-y-8  h-[95%] w-full bg-milk-white rounded-xl text-black-coffee px-5 pt-9 pb-6`}
      >
        <h1 className=" text-sm font-semibold  text-left ">
          Q{step}. {ques.question}
        </h1>

        <ul aria-labelledby="question" className="flex flex-col flex-1 gap-y-2">
          {ques.options.map((option, index) => {
            return (
              <li className="pressable min-h-10 flex-1" key={index}>
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
                  className={`pressable w-full h-full  text-xs font-normal text-left px-4 py-3 rounded-xl transition-colors border
                  ${
                    selectedOptionIndex === index
                      ? " border-[#00A55C]/20 bg-[#00A55C]/20 active:ring-2 active:ring-[#00A55C]/20"
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

      {/* fake next 2 cards below */}


      {step <= 9 && (
        // {/* farther div  piche wala*/}
        <div className="absolute w-[87%] h-[5%]  left-1/2 bottom-0 bg-white/10  rounded-b-xl  z-10  transform -translate-x-1/2"></div>
      )}

      {step <= 10 && (
        // {/* closer div  nzdik wala*/}
        <div className="absolute w-[94%] h-[5%]  left-1/2 bottom-[2.5%] bg-white/10 rounded-b-xl  z-30 transform -translate-x-1/2"></div>
      )}
    </div>
  );
};

export default QuizComponent;
