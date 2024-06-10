import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const Hero = (props: any) => {

  const src = `http://localhost:3210/upload/${props.person_image}`;
  console.log(props)
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      <div
        className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
          <div
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          >
            <h1 className="Welcome-text text-[13px]">
                {props.position}
            </h1>
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          </div>

          <div
            className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              {props.firstname} {props.lastname}
            </span>
          </div>

          <p
            className="text-lg text-gray-400 my-5 max-w-[600px]"
          >
            {props.about_me}
          </p>
        </div>

        <div
          className="w-full h-full flex justify-center items-center"
        >
          <Image
            src={src}
            alt={props.firstname + ' ' + props.lastname}
            height={650}
            width={650}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
