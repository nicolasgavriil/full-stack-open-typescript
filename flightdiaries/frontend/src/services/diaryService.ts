import axios from "axios";
import type { NonSensitiveDiaryEntry } from "../types.ts";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export default { getAll };
