"use client";
import React, { useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import Modal from "../../../../components/Modal";
import { Button, MenuItem, TextField } from "@mui/material";
import { createNewCard } from "@/app/actions/createNewCard";
import { useAuth } from "@clerk/nextjs/app-beta/client";
import { LocalCard } from "@/types";
import {colors} from "../../../../utils/constants"
type Props = {
  category: string;
};
const initialForm: LocalCard = {
  uid: "",
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  type: 1,
  hint: "",
  colorCode: "#ffffff",
};


export default function Actions({ category }: Props) {
  const [newCardModal, setNewCardModal] = useState<boolean>(false);
  const [newCard, setNewCard] = useState<LocalCard>(initialForm);
  const cUser = useAuth();
  const handleCreateNewCard = async (e: React.FormEvent<HTMLFormElement>) => {    
    await createNewCard({ ...newCard, uid: cUser.userId!, category: category });
    setNewCard(JSON.parse(JSON.stringify(initialForm)));
    setNewCardModal(false);
  };

  return (
    <div className="flex justify-end [&>button]:ml-2 p-4">
      <button
        className="bg-green-800 rounded-md hover:bg-green-900 p-2 px-4 text-white flex gap-2 items-center"
        onClick={() => setNewCardModal(true)}
      >
        <span>New card</span>
        <BiPlus />
      </button>
      <Modal
        className="w-4/5 max-w-3xl"
        title="Create new card"
        onClose={() => setNewCardModal(false)}
        isOpen={newCardModal}
      >
        <form
          className="p-4 flex flex-col gap-2"
          onSubmit={handleCreateNewCard}
        >
          <TextField
          select
          placeholder="Question type"
          label="Question type"
          variant="filled"
          value={newCard.type}
          onChange={(e) => setNewCard({ ...newCard, type: Number(e.target.value) })}
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
              setNewCard((prev) => ({ ...prev, description: e.target.value }))
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
              setNewCard((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
          />
          <div className="flex gap-2 justify-center flex-wrap">
            {colors.map((color) => (
              <button
              key={color}
              type="button"
              onClick={() => setNewCard((prev) => ({ ...prev, colorCode: color }))}
                className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                  newCard.colorCode === color ? "border-black" : "scale-90 border-gray-300"
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
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
}
