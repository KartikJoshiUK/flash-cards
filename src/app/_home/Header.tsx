import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Sidebar from "./Sidebar";

type Props = {};

function Header({}: Props) {
  return (
    <header className="bg-gray-900 text-white h-16 sticky top-0 flex justify-between p-2 items-center z-50">
      <Link href={"/"} className="flex items-center gap-2 flex-[4] text-white font-bold">
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        FlashCardFlow
      </Link>
      <nav className="hidden md:flex flex-[12] justify-center gap-2">
        <Link
          className="text-gray-200 transition-colors hover:text-gray-300 p-2 rounded-md"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="text-gray-200 transition-colors hover:text-gray-300 p-2 rounded-md"
          href={"/dashboard"}
        >
          Dashboard
        </Link>
        <Link
          className="text-gray-200 transition-colors hover:text-gray-300 p-2 rounded-md"
          href={"/about"}
        >
          About
        </Link>
      </nav>
      <div className="flex justify-end items-center gap-2 flex-[4]">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Sidebar className="md:hidden"/>
      </div>
    </header>
  );
}

export default Header;
