"use client";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Modal from "../../../components/Modal";
import { Button, MenuItem, TextField } from "@mui/material";
import { createNewCategory } from "@/app/actions/createNewCategory";
import { useAuth } from "@clerk/nextjs/app-beta/client";
import { PiExam } from "react-icons/pi";
import { useRouter } from "next/navigation";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import GenerateTestModal from "@/components/modals/GenerateTestModal";

type Props = {
  categories : string[]
};

export type TestForm = {
  categories: any;
};
const initialForm = {
  categories: [],
};
export default function Actions({categories}: Props) {
  const [newCategoryModal, setNewCategoryModal] = useState<boolean>(false);
  const [testCreationModal, setTestCreationModal] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [testForm, setTestForm] = useState<TestForm>(initialForm);
  
  const router = useRouter()
  const cUser = useAuth();
  const handleCreateNewCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    await createNewCategory(newCategory, cUser.userId!);
    setNewCategory("");
    setNewCategoryModal(false);
  };
  const handleTestCreation = (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setTestCreationModal(false);
    const url = '/test?categories='+testForm.categories.join(',')
    router.push(url)
  }
  return (
    <div className="flex justify-end [&>button]:ml-2 p-4">
      <button
        className="bg-green-800 rounded-md hover:bg-green-900 p-2 px-4 text-white flex gap-2 items-center"
        onClick={() => setNewCategoryModal(true)}
      >
        <span>New category</span>
        <BiPlus />
      </button>
      <Modal
        title="Create new category"
        
        onClose={() => setNewCategoryModal(false)}
        isOpen={newCategoryModal}
      >
        <AddCategoryModal category={newCategory} setCategory={setNewCategory} handleSubmit={handleCreateNewCategory}/>
      </Modal>
      <button
        className="bg-green-800 rounded-md hover:bg-green-900 p-2 px-4 text-white flex gap-2 items-center"
        onClick={() => setTestCreationModal(true)}
      >
        <span>Generate test</span>
        <PiExam />
      </button>
      <Modal
        title="Create new test"
        isOpen={testCreationModal}
        onClose={() => setTestCreationModal(false)}
      >
        <GenerateTestModal testForm={testForm} setTestForm={setTestForm} handleSubmit={handleTestCreation} categories={categories}/>
      </Modal>
    </div>
  );
}
