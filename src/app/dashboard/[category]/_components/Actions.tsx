"use client";
import React, { useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import Modal from "../../../../components/Modal";
import { Button, MenuItem, TextField } from "@mui/material";
import { createNewCard } from "@/app/actions/createNewCard";
import { useAuth } from "@clerk/nextjs/app-beta/client";
import { LocalCard } from "@/types";
import {colors} from "../../../../utils/constants"
import CardModal from "@/components/modals/CardModal";
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
        title="Create new card"
        onClose={() => setNewCardModal(false)}
        isOpen={newCardModal}
      >
        <CardModal handleSubmit={handleCreateNewCard} card={newCard} setCard={setNewCard}/>
      </Modal>
    </div>
  );
}
