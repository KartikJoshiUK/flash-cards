import { TestForm } from '@/app/dashboard/_components/Actions';
import { Button, MenuItem, TextField } from '@mui/material';
import React from 'react'

type Props = {
    categories : string[];
    testForm : TestForm;
    setTestForm : React.Dispatch<React.SetStateAction<TestForm>>;
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function GenerateTestModal({testForm, setTestForm, handleSubmit, categories}: Props) {
  return (
    <form className="p-4 flex flex-col gap-2" onSubmit={handleSubmit}>
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
  )
}