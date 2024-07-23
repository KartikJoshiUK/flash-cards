import { LocalCard } from "@/types";
import { colors } from "@/utils/constants";
import { Button, MenuItem, TextField } from "@mui/material";
import React from "react";
import { BiCheck } from "react-icons/bi";

type Props = {
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
    card : LocalCard;
    setCard : React.Dispatch<React.SetStateAction<LocalCard>>;
};

export default function CardModal({handleSubmit, card,setCard}: Props) {
  return (
    <form className="p-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <TextField
        select
        placeholder="Question type"
        label="Question type"
        variant="filled"
        value={card.type}
        onChange={(e) =>
          setCard({ ...card, type: Number(e.target.value) })
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
        value={card.title}
        onChange={(e) =>
          setCard((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <TextField
        placeholder="Write the meaning/description of the word"
        label="Description *"
        variant="standard"
        required
        name="description"
        value={card.description}
        onChange={(e) =>
          setCard((prev) => ({
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
        value={card.hint}
        onChange={(e) =>
          setCard((prev) => ({ ...prev, hint: e.target.value }))
        }
      />
      <TextField
        placeholder="https://www.image.com"
        label="Image URL *"
        variant="standard"
        name="imageUrl"
        required
        value={card.imageUrl}
        onChange={(e) =>
          setCard((prev) => ({
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
              setCard((prev) => ({ ...prev, colorCode: color }))
            }
            className={`w-8 h-8 rounded-full border flex items-center justify-center ${
              card.colorCode === color
                ? "border-black"
                : "scale-90 border-gray-300"
            }`}
            style={{ backgroundColor: color }}
          >
            {card.colorCode === color && <BiCheck />}
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
  );
}
