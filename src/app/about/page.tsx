import React from "react";
import { SiGithub, SiGmail, SiInstagram, SiLinkedin } from "react-icons/si";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-2">
      <img
        className="w-32 h-32 md:w-64 md:h-64"
        src="https://cdn.sanity.io/images/lzbdpqgd/production/5a7ce2035d2d715b63af8543061796a6a67caaea-600x600.png"
        alt="developer"
      />
      <p className="text-gray-700">Developed By</p>
      <h1 className="font-bold text-4xl">
        <a
          href="https://kartikjoshi.netlify.app"
          target="_blank"
          rel="noreferrer"
        >
          Kartik Joshi
        </a>
      </h1>
      <div className="flex items-center justify-center gap-4">
        <a
          href="mailto:kartikjoshiuk@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="text-3xl hover:text-gray-700 transition-colors"
        >
          <SiGmail/>
        </a>
        <a
          href="https://github.com/kartikjoshiuk"
          target="_blank"
          rel="noreferrer"
          className="text-3xl hover:text-gray-700 transition-colors"
        >
          <SiGithub/>
        </a>
        <a
          href="https://www.linkedin.com/in/kartikjoshiuk"
          target="_blank"
          rel="noreferrer"
          className="text-3xl hover:text-gray-700 transition-colors"
        >
          <SiLinkedin/>
        </a>
        <a
          href="https://www.instagram.com/kartikjoshi2003"
          target="_blank"
          rel="noreferrer"
          className="text-3xl hover:text-gray-700 transition-colors"
        >
          <SiInstagram/>
        </a>
      </div>
    </div>
  );
}
