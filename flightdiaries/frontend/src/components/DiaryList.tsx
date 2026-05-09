import type { DiaryEntry } from "../types.ts";

interface DiaryListProps {
  diaryEntries: DiaryEntry[];
}

const DiaryList = ({ diaryEntries }: DiaryListProps) => {
  return (
    <>
      <h1>Diary Entries</h1>
      <ul>
        {diaryEntries.map((entry) => (
          <li key={entry.id}>
            {entry.date} {entry.weather} {entry.visibility}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DiaryList;
