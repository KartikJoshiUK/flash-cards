"use client";
import { Card as CardType } from "@prisma/client";
import React, { useState } from "react";
import ToolTip from "../../../../components/ToolTip";
import { MdFlip } from "react-icons/md";
import {  BiEdit } from "react-icons/bi";
import Modal from "@/components/Modal";
import { LocalCard } from "@/types";
import { editCard } from "@/app/actions/editCard";
import styles from "./Card.module.css";
import CardModal from "@/components/modals/CardModal";
type Props = {
  card: CardType;
  editable?: boolean;
};

export default function Card({ card, editable }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newCard, setNewCard] = useState<LocalCard>(card);

  const handleEditCard = async (_: React.FormEvent<HTMLFormElement>) => {
    await editCard(newCard, card.id);
    setEditModalOpen(false);
  };
  return (
    <div
      className={`${styles.card} ${
        revealed ? styles.cardRotate : ""
      } rounded-xl w-96 h-52 relative transition-all duration-500`}
      
    >
      <div
        className={`${styles.cardBack} flex h-full w-full rounded-xl overflow-hidden relative shadow-xl`}
        style={{
          backgroundColor: card.colorCode,
          color: card.colorCode >= "#ffffff" ? "#000000" : "#ffffff",
        }}
      >
        <img
          className="w-1/2 h-full object-cover"
          src={card.imageUrl}
          alt={card.title}
        />
        <div className="text-start flex flex-col w-full">
          <h1 className="font-semibold p-2 bg-black text-center text-white">
            {card.title}
          </h1>
          <div className="p-2">
            <p className="capitalize text-sm text-gray-300">{card.category}</p>
            <p>{card.description}</p>
          </div>
        </div>
        {editable && (
          <button
            className="absolute bottom-0 right-0 p-2 rounded-br-md "
            style={{
              color: card.colorCode >= "#ffffff" ? "#000000" : "#ffffff",
              backgroundColor:
                card.colorCode >= "#ffffff" ? "#ffffff" : "#333333",
            }}
            onClick={() => setEditModalOpen(true)}
          >
            <BiEdit />
            <Modal
              isOpen={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              title="Edit Card"
            >
              <CardModal card={newCard} setCard={setNewCard} handleSubmit={handleEditCard} />
            </Modal>
          </button>
        )}
        <button
          className="absolute top-0 right-0 p-2 rounded-tr-md"
          style={{
            color: card.colorCode >= "#ffffff" ? "#000000" : "#ffffff",
            backgroundColor:
              card.colorCode >= "#ffffff" ? "#ffffff" : "#333333",
          }}
          onClick={() => setRevealed(!revealed)}
        >
          <MdFlip />
        </button>
      </div>
      <div
        className={`${
          styles.cardFront
        } w-full h-full overflow-hidden rounded-xl shadow-xl ${card.type === 1 && ""} ${
          card.type === 2 && "flex items-center justify-center"
        } ${card.type === 3 && ""}`}
        style={{
          backgroundColor: card.colorCode,
          color: card.colorCode >= "#ffffff" ? "#000000" : "#ffffff",
        }}
      >
        {card.type === 1 && (
          <img
            className="w-full h-full object-contain"
            src={card.imageUrl}
            alt="word"
          />
        )}
        {card.type === 2 && (
          <h1 className="font-bold text-3xl">{card.title}</h1>
        )}
        {card.type === 3 && (
          <div className="w-full h-full flex">
            <img
              className="w-1/2 object-contain"
              src={card.imageUrl}
              alt="word"
            />
            <h1 className="w-1/2 flex items-center justify-center font-bold text-3xl">
              {card.title}
            </h1>
          </div>
        )}
        <ToolTip
          className="ml-2 absolute top-4 left-4 z-10"
          text={card.hint || card.category}
        />
        <button
          className="absolute top-0 right-0 p-2 rounded-tr-md"
          style={{
            color: card.colorCode >= "#ffffff" ? "#000000" : "#ffffff",
            backgroundColor:
              card.colorCode >= "#ffffff" ? "#ffffff" : "#333333",
          }}
          onClick={() => setRevealed(!revealed)}
        >
          <MdFlip />
        </button>
      </div>
    </div>
  );
}
