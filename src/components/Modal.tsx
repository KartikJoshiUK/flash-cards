"use client";
import React from "react";
import ReactDOM from "react-dom";
import { RxCross1 } from "react-icons/rx";
type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  title: string;
  onClose: () => void;
};

const Modal = (props: Props) => {
  if (!props.isOpen) return null;
  return (
    <div>
      {ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black/10" onClick={props.onClose}>
          <div
            className={
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center bg-gray-50 shadow-md rounded-md overflow-hidden" + " "  + props.className
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between gap-4 p-4 bg-gray-800 text-white">
              <h1 className="font-bold">{props.title}</h1>
              <button onClick={props.onClose}>
                <RxCross1 />
              </button>
            </div>
            {props.children}
          </div>
        </div>,
        document.getElementById("modal")!
      )}
    </div>
  );
};

export default Modal;
