import { useState } from "react";
import { Visibility, Weather, type NewDiaryEntry } from "../types.ts";

interface NewEntryFormProps {
  createDiaryEntry: (entry: NewDiaryEntry) => Promise<void>;
}

const NewEntryForm = ({ createDiaryEntry }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createDiaryEntry({
      date,
      weather,
      visibility,
      comment,
    });
    setDate("");
    setWeather("sunny");
    setVisibility("great");
    setComment("");
  };

  return (
    <div>
      <h2>Create new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Weather:</label>

          <label>
            <input
              type="radio"
              name="weather"
              value="sunny"
              checked={weather === "sunny"}
              onChange={() => setWeather("sunny")}
            />
            sunny
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              checked={weather === "rainy"}
              onChange={() => setWeather("rainy")}
            />
            rainy
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={() => setWeather("cloudy")}
            />
            cloudy
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              checked={weather === "stormy"}
              onChange={() => setWeather("stormy")}
            />
            stormy
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="windy"
              checked={weather === "windy"}
              onChange={() => setWeather("windy")}
            />
            windy
          </label>
        </div>

        <div>
          <label>Visibility:</label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="great"
              checked={visibility === "great"}
              onChange={() => setVisibility("great")}
            />
            great
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="good"
              checked={visibility === "good"}
              onChange={() => setVisibility("good")}
            />
            good
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              checked={visibility === "ok"}
              onChange={() => setVisibility("ok")}
            />
            ok
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              checked={visibility === "poor"}
              onChange={() => setVisibility("poor")}
            />
            poor
          </label>
        </div>
        <div>
          <label>Comment:</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
