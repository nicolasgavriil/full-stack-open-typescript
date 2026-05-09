import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types.ts";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

const create = async (entry: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, entry);
  return response.data;
};

export default { getAll, create };
