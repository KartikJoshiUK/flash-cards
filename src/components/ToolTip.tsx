"use client";
import React, { useState } from 'react'
import { BiInfoCircle } from 'react-icons/bi';

type Props = {
    text : string;
    className : string;
}

export default function ToolTip({text, className}: Props) {
    const relative = !className.includes("absolute")
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div title='hint' className={`${relative && "relative"}`+" "+className}>
        <button onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}><BiInfoCircle/></button>
        {isOpen && <div className="absolute bg-gray-100 p-2 rounded-md max-w-32 shadow-xl text-black capitalize">{text}</div>}
    </div>
  )
}