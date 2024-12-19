import { Download, Share2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const ThankYouScreen = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/cream-bg.png')",
        paddingTop: "42%",
        // percent is wrt to this divs width not height
      }}
      className="h-svh bg-no-repeat bg-cover pb-9 flex  flex-col box px-5 gap-y-[19%]"
    >
      <div className="flex flex-col justify-between flex-1">
        <h1 className="text-[2.5rem] leading-tight font-bold text-left text-dark-brown">
          Thank You for
          <br />
          taking the
          <br />
          quiz
        </h1>

        <Image
          className="self-end "
          priority={true}
          src={"/images/open book.png"}
          width={222}
          height={203}
          alt="open book image"
        />
      </div>

      <div className="flex justify-between w-full gap-x-3">
        {/* Download Button */}
        <button className=" text-xs  leading-5 font-semibold text-center bg-dark-brown w-1/2 text-white p-3 rounded-3xl flex items-center justify-center gap-x-2  hover:bg-brown-700 focus:outline-none">
          <Download size={20} />
          <span className=" whitespace-nowrap">Download Report</span>
        </button>


        {/* Share Button */}
        <button className="text-xs leading-5 font-semibold text-center bg-dark-brown w-1/2 text-white p-3 rounded-3xl flex items-center justify-center gap-x-2  hover:bg-brown-700 focus:outline-none">
          <Share2 size={20} />
          <span className=" whitespace-nowrap">Share Report</span>
        </button>
      </div>
    </div>
  );
};

export default ThankYouScreen;
