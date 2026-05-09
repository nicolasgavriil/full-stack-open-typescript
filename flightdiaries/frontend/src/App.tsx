import { useState, useEffect } from "react";
import type { NonSensitiveDiaryEntry } from "./types.ts";
import diaryService from "./services/diaryService.ts";

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

  return (
    <div>
      {diaryEntries.map((entry) => (
        <div key={entry.id}>
          {entry.date} {entry.weather} {entry.visibility}
        </div>
      ))}
    </div>
  );
};

export default App;
