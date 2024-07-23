"use client";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Modal from "../../../components/Modal";
import { Button, MenuItem, TextField } from "@mui/material";
import { createNewCategory } from "@/app/actions/createNewCategory";
import { useAuth } from "@clerk/nextjs/app-beta/client";
import { PiExam } from "react-icons/pi";
import { useRouter } from "next/navigation";

type Props = {
  categories : string[]
};

type TestForm = {
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
        <form
          className="p-4 flex flex-col gap-2"
          onSubmit={handleCreateNewCategory}
        >
          <TextField
            placeholder="Category name"
            variant="standard"
            name="category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
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
        <form className="p-4 flex flex-col gap-2" onSubmit={handleTestCreation}>
          <TextField
            label="Select Categories"
            select
            value={testForm.categories}
            onChange={(e) => setTestForm((prev) => ({ ...prev, categories: e.target.value }))}
            fullWidth
            SelectProps={{
              multiple: true,
            }}
          >
            {categories.map((category) => (
              <MenuItem className="capitalize" key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="self-end"
          >
            Start
          </Button>
        </form>
      </Modal>
    </div>
  );
}
