import LinkButton from "@/components/common/LinkButton";
import SmoothCardCarousel from "@/components/common/SmoothCardCarousel";

const Archetype = () => {
  return (
    <div className={`bg-cream h-svh w-full flex flex-col gap-y-9 pt-14`}>
      <h1 className="text-black  text-5xl font-bold  tracking-[0.01em] text-left px-5 ">
        Career
        <br />
        Archetype
      </h1>

      <div className="relative w-full flex-1 min-h-[80%]  overflow-hidden flex items-center justify-center gap-x-4 px-5">
        <SmoothCardCarousel reverse={false} scrollDirection="up" />
        <SmoothCardCarousel scrollDirection="down" reverse={false} />
        <SmoothCardCarousel reverse={true} scrollDirection="up" />
      </div>

      <LinkButton
        href={"/intro-video"}
        title={"START QUIZ"}
        className={"uppercase absolute bottom-9 -translate-x-1/2 left-1/2 z-20"}
      />
    </div>
  );
};

export default Archetype;
