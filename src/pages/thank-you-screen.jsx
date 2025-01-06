import { Download, Share2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ThankYouScreen = () => {
  const [shared, setShared] = useState(false);
  const [error, setError] = useState('');

  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
    setStartAnimation(true);
  }, []);


  const handleShare = async () => {
    // Reset states
    setError('');
    setShared(false);

    try {
      // Check if Web Share API is supported
      if (!navigator.share) {
        throw new Error('Web Share API not supported');
      }
      await navigator.share({
        title: 'Check out this PDF!',
        text: 'Here is a PDF that you might find interesting.',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      });

      setShared(true);
      setTimeout(() => setShared(false), 2000); // Reset success state after 2s
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000); // Clear error after 3s
    }
  };

  const handleDownload = () => {
    const fileUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    window.open(fileUrl, '_blank'); // Opens the PDF in a new tab
  };
  



  return (
    <div
      style={{
        backgroundImage: "url('/images/cream-bg.png')",
        paddingTop: "42%",
        // percent is wrt to this divs width not height
      }}
      className="fixed inset-0 h-svh bg-no-repeat bg-cover pb-9 flex  flex-col box px-5 gap-y-[19%]"
    >
      <div className="flex flex-col justify-between flex-1">
        <h1 className={`
          transition-all duration-1000 ease-in-out
          ${startAnimation ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          text-[2.5rem] leading-tight font-bold text-left text-dark-brown`}>
          Thank You for
          <br />
          taking the
          <br />
          quiz
        </h1>

        <Image
          className={`
          self-end transition-all duration-1000 ease-in-out
          ${startAnimation ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          priority={true}
          src={"/images/open book.png"}
          width={222}
          height={203}
          alt="open book image"
        />
      </div>

      <div className={`flex justify-between w-full gap-x-3 self-end 
          transition-all duration-1000 ease-in-out
          ${startAnimation ? "translate-y-0 opacity-100" : "translate-y-36 opacity-0"}
        `}>
        {/* Download Button */}
        <button 
        onClick={handleDownload}
        className=" text-xs  leading-5 font-semibold text-center bg-dark-brown w-1/2 text-white p-3 rounded-3xl flex items-center justify-center gap-x-2  hover:bg-brown-700 focus:outline-none">
          <Download size={20} />
          <span className=" whitespace-nowrap">Download Report</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="text-xs leading-5 font-semibold text-center bg-dark-brown w-1/2 text-white p-3 rounded-3xl flex items-center justify-center gap-x-2  hover:bg-brown-700 focus:outline-none"
        >
          <Share2 size={20} />
          <span className=" whitespace-nowrap">Share Report</span>
        </button>
      </div>
    </div>
  );
};

export default ThankYouScreen;
