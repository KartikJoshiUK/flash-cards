"use client";
import React, { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

type Props = {
  text: string;
  className: string;
};

export default function ToolTip({ text, className }: Props) {
  const relative = !className.includes("absolute");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div title="hint" className={`${relative && "relative "}` + " " + className}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <BiInfoCircle />
      </button>
        <div className={`absolute top-full left-full bg-gray-100 p-2 rounded-md rounded-tl-none w-[100px] max-w-[90vw] shadow-xl text-black capitalize ${isOpen ? "" : "translate-y-[-50%] translate-x-[-50%] scale-0"} transition-all duration-300 ease-in-out`}>
          {text}
        </div>
    </div>
  );
}
