import { useState, useEffect } from "react";
import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types.ts";
import diaryService from "./services/diaryService.ts";
import NewEntryForm from "./components/NewEntryForm.tsx";
import DiaryList from "./components/DiaryList.tsx";
import Notification from "./components/Notification.tsx";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    [],
  );
  const [notification, setNotification] = useState("");

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
        const errorField: string = err.response?.data?.error[0].path;
        const errorMessage: string[] =
          err.response?.data?.error[0].values ||
          err.response?.data?.error[0].message;
        setNotification(`Error: Incorrect ${errorField}: ${errorMessage}`);
        setTimeout(() => {
          setNotification("");
        }, 5000);
      } else {
        console.log("unexpected error:", err);
        setNotification("unexpected error");
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      <DiaryList diaryEntries={diaryEntries} />
      <NewEntryForm createDiaryEntry={createDiaryEntry} />
    </div>
  );
};

export default App;
