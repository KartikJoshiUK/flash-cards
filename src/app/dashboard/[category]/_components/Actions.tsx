"use client";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Modal from "../../../../components/Modal";
import { Button, TextField } from "@mui/material";
import { createNewCard } from "@/app/actions/createNewCard";
import { useAuth } from "@clerk/nextjs/app-beta/client";
import { LocalCard } from "@/types";

type Props = {
  category : string
};
const initialForm : LocalCard = {
    uid : "",
    title : "",
    description : "",
    category : "",
    imageUrl : "",
    colorCode : "#ffffff"
  }
export default function Actions({category}: Props) {
  const [newCardModal, setNewCardModal] = useState<boolean>(false);
  const [newCard, setNewCard] = useState<LocalCard>(initialForm);
  const cUser = useAuth();
  const handleCreateNewCard = async (e: React.FormEvent<HTMLFormElement>) => {
    await createNewCard({...newCard, uid : cUser.userId!, category : category});
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
            placeholder="Title"
            variant="standard"
            name="title"
            value={newCard.title}
            onChange={(e) => setNewCard(prev=>({...prev, title : e.target.value}))}
          />
          <TextField
            placeholder="Description"
            variant="standard"
            name="description"
            value={newCard.description}
            onChange={(e) => setNewCard(prev=>({...prev, description : e.target.value}))}
          />
          <TextField
            placeholder="Image URL"
            variant="standard"
            name="imageUrl"
            value={newCard.imageUrl}
            onChange={(e) => setNewCard(prev=>({...prev, imageUrl : e.target.value}))}
          />
          <TextField
            placeholder="Background color"
            variant="standard"
            name="colorCode"
            type="color"
            value={newCard.colorCode}
            onChange={(e) => setNewCard(prev=>({...prev, colorCode : e.target.value}))}
          />
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
