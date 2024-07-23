import { Button, TextField } from '@mui/material'
import React from 'react'

type Props = {
    category : string;
    setCategory : React.Dispatch<React.SetStateAction<string>>;
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddCategoryModal({category, setCategory, handleSubmit}: Props) {
  return (
    <form
          className="p-4 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <TextField
            placeholder="Category name"
            variant="standard"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
  )
}