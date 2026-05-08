import { Gender, type NewPatient } from "./types.ts";

const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing data");
  }

  if (
    "ssn" in object &&
    "name" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newPatient: NewPatient = {
      ssn: parseText(object.ssn),
      name: parseText(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseText(object.occupation),
      gender: parseGender(object.gender),
    };

    return newPatient;
  }

  throw new Error("incorrect data: some fields are missing");
};

export default parseNewPatient;

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("incorrect or missing field: " + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("incorrect or missing gender: " + gender);
  }
  return gender;
};
