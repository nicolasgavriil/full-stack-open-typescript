import { useState } from "react";
import type { NewDiaryEntry } from "../types.ts";

interface NewEntryFormProps {
  createDiaryEntry: (entry: NewDiaryEntry) => Promise<void>;
}

const NewEntryForm = ({ createDiaryEntry }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createDiaryEntry({
      date,
      weather,
      visibility,
    });
    setDate("");
    setWeather("");
    setVisibility("");
  };

  return (
    <div>
      <h2>Create new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Weather:
            <input
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <input
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
