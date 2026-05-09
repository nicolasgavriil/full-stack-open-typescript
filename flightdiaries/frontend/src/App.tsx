import { useState, useEffect } from "react";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types.ts";
import diaryService from "./services/diaryService.ts";
import NewEntryForm from "./components/NewEntryForm.tsx";
import axios from "axios";
import DiaryList from "./components/DiaryList.tsx";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    [],
  );

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const initialEntries = await diaryService.getAll();
      setDiaryEntries(initialEntries);
    };
    fetchDiaryEntries();
  }, []);

  const createDiaryEntry = async (entry: NewDiaryEntry) => {
    try {
      const addedDiaryEntry = await diaryService.create(entry);
      setDiaryEntries((perv) => perv.concat(addedDiaryEntry));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data);
      } else {
        console.log("unexpected error:", err);
      }
    }
  };

  return (
    <div>
      <DiaryList diaryEntries={diaryEntries} />
      <NewEntryForm createDiaryEntry={createDiaryEntry} />
    </div>
  );
};

export default App;
