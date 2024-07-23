"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
type Props = {
  className: string;
};

export default function Sidebar({ className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"flex items-center justify-center" + " " + className}>
      <button
        onClick={() => setOpen((open) => !open)}
        className="bg-gray-800 rounded-full hover:bg-gray-900 p-2"
      >
        {open ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
      </button>
      <aside
        className={`h-screen sm:w-[300px] w-full fixed top-0 transition-[right]  ${
          open ? "right-[0%]" : "right-[-100%]"
        } bg-gray-950 p-4 pt-16 z-10`}
      >
        <button
          className="absolute top-3 right-3 bg-gray-800   rounded-full hover:bg-gray-900 z-10 p-2"
          onClick={() => setOpen(false)}
        >
          <RxCross2 size={24} />
        </button>
        <nav className="flex flex-col gap-2">
          <Link
            className="bg-gray-700 transition-colors hover:bg-gray-600 p-2 rounded-md"
            href={"/"}
            onClick={()=>setOpen(false)}
          >
            Home
          </Link>
          <Link
            className="bg-gray-700 transition-colors hover:bg-gray-600 p-2 rounded-md"
            href={"/dashboard"}
            onClick={()=>setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            className="bg-gray-700 transition-colors hover:bg-gray-600 p-2 rounded-md"
            href={"/about"}
            onClick={()=>setOpen(false)}
          >
            About
          </Link>
        </nav>
      </aside>
    </div>
  );
}
