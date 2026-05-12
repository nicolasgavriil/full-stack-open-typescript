import { Diagnosis, Entry } from "../../types.ts";
import HealthCheckEntryCard from "./HealthCheckEntryCard.tsx";
import HospitalEntryCard from "./HospitalEntryCard.tsx";
import OccupationalHealthcareEntryCard from "./OccupationalHealthcareEntryCard.tsx";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

function assertNever(value: never): never {
  throw new Error("Unexpected value: " + value);
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryCard entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryCard entry={entry} diagnoses={diagnoses} />
      );
    case "Hospital":
      return <HospitalEntryCard entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
