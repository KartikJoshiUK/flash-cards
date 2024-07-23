"use client";
import { Card as CardType } from "@prisma/client";
import React, { useState } from "react";
import ToolTip from "../../../../components/ToolTip";
import { MdFlip } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Modal from "@/components/Modal";
import { Button, TextField } from "@mui/material";
import { LocalCard } from "@/types";
import { editCard } from "@/app/actions/editCard";

type Props = {
  card: CardType;
  editable?: boolean;
};

export default function Card({ card, editable }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newCard, setNewCard] = useState<LocalCard>(card);

  const handleEditCard = async (_ : React.FormEvent<HTMLFormElement>)=>{
    await editCard(newCard, card.id);
    setEditModalOpen(false);
  }
  return (
    <div
      className={`rounded-xl shadow-xl w-72 h-44 flex relative transition-all duration-300 ${
        revealed ? "flex-col" : "flex-row items-center justify-center"
      }`}
      style={{
        backgroundColor: card.colorCode,
        color: card.colorCode >= "#ffffff" ? "#000000" : "#ffffff",
        transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      {revealed ? (
        <div
          className="flex h-full w-full rounded-xl overflow-hidden relative"
          style={{ transform: "rotateY(180deg)" }}
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
              <p className="capitalize text-sm text-gray-300">
                {card.category}
              </p>
              <p>{card.description}</p>
            </div>
          </div>
          {editable && (
            <button
              className="absolute bottom-0 right-0 p-2 rounded-br-md"
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
                <form
                  className="p-4 flex flex-col gap-2"
                  onSubmit={handleEditCard}
                >
                  <TextField
                    placeholder="Title"
                    variant="standard"
                    name="title"
                    value={newCard.title}
                    onChange={(e) =>
                      setNewCard((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                  <TextField
                    placeholder="Description"
                    variant="standard"
                    name="description"
                    value={newCard.description}
                    onChange={(e) =>
                      setNewCard((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    placeholder="Image URL"
                    variant="standard"
                    name="imageUrl"
                    value={newCard.imageUrl}
                    onChange={(e) =>
                      setNewCard((prev) => ({
                        ...prev,
                        imageUrl: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    placeholder="Background color"
                    variant="standard"
                    name="colorCode"
                    type="color"
                    value={newCard.colorCode}
                    onChange={(e) =>
                      setNewCard((prev) => ({
                        ...prev,
                        colorCode: e.target.value,
                      }))
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="self-end"
                  >
                    Cofirm
                  </Button>
                </form>
              </Modal>
            </button>
          )}
        </div>
      ) : (
        <div className="p-6">
          <h1 className="font-bold text-2xl">{card.title}</h1>
          <ToolTip
            className="ml-2 absolute top-4 right-4 z-10"
            text={card.category}
          />
        </div>
      )}
      <button
        className="absolute bottom-0 right-0 p-2 rounded-br-md"
        style={{
          color: card.colorCode >= "#ffffff" ? "#000000" : "#ffffff",
          backgroundColor: card.colorCode >= "#ffffff" ? "#ffffff" : "#333333",
        }}
        onClick={() => setRevealed(!revealed)}
      >
        <MdFlip />
      </button>
    </div>
  );
}
