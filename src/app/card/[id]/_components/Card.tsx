"use client";
import { Card as CardType } from "@prisma/client";
import React, { useState } from "react";
import ToolTip from "../../../../components/ToolTip";
import { MdFlip } from "react-icons/md";
import { BiCheck, BiEdit } from "react-icons/bi";
import Modal from "@/components/Modal";
import { Button, MenuItem, TextField } from "@mui/material";
import { LocalCard } from "@/types";
import { editCard } from "@/app/actions/editCard";
import { colors } from "../../../../utils/constants";
import styles from "./Card.module.css";
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
              <form
                className="p-4 flex flex-col gap-2"
                onSubmit={handleEditCard}
              >
                <TextField
                  select
                  placeholder="Question type"
                  label="Question type"
                  variant="filled"
                  value={newCard.type}
                  onChange={(e) =>
                    setNewCard({ ...newCard, type: Number(e.target.value) })
                  }
                >
                  <MenuItem value={1}>Image as question</MenuItem>
                  <MenuItem value={2}>Word as question</MenuItem>
                  <MenuItem value={3}>Both image and word</MenuItem>
                </TextField>

                <TextField
                  placeholder="Enter the word"
                  variant="standard"
                  name="title"
                  label="Title"
                  required
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <TextField
                  placeholder="Write the meaning/description of the word"
                  label="Description *"
                  variant="standard"
                  required
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
                  placeholder="Animal"
                  label="Hint (optional)"
                  variant="standard"
                  name="hint"
                  value={newCard.hint}
                  onChange={(e) =>
                    setNewCard((prev) => ({ ...prev, hint: e.target.value }))
                  }
                />
                <TextField
                  placeholder="https://www.image.com"
                  label="Image URL *"
                  variant="standard"
                  name="imageUrl"
                  required
                  value={newCard.imageUrl}
                  onChange={(e) =>
                    setNewCard((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }))
                  }
                />
                <div className="flex gap-2 justify-center flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setNewCard((prev) => ({ ...prev, colorCode: color }))
                      }
                      className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                        newCard.colorCode === color
                          ? "border-black"
                          : "scale-90 border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {newCard.colorCode === color && <BiCheck />}
                    </button>
                  ))}
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="self-end"
                >
                  Confirm
                </Button>
              </form>
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
