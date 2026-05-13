import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import type { Diagnosis, Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails.tsx";
import NewEntryForm from "./NewEntryForm.tsx";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [entryFormVisible, setEntryFormVisible] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id);
        setPatient(patient);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPatient();
  }, [id]);

  if (!id) return;

  if (!patient) {
    return <div>Loading...</div>;
  }

  const onEntryAdded = (entry: Entry) => {
    setPatient((prev) =>
      prev
        ? {
            ...prev,
            entries: prev.entries.concat(entry),
          }
        : prev,
    );

    setEntryFormVisible(false);
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            {patient.name}
          </Typography>

          {patient.gender === "female" && <FemaleIcon fontSize="large" />}
          {patient.gender === "male" && <MaleIcon fontSize="large" />}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography>
            <strong>ssn:</strong> {patient.ssn}
          </Typography>

          <Typography>
            <strong>occupation:</strong> {patient.occupation}
          </Typography>

          <Typography>
            <strong>date of birth:</strong> {patient.dateOfBirth}
          </Typography>
        </Box>
      </Box>
      {!entryFormVisible && (
        <Button
          variant="contained"
          onClick={() => setEntryFormVisible(true)}
          sx={{ mt: 2, mb: 2 }}
        >
          Add New Entry
        </Button>
      )}

      {entryFormVisible && (
        <NewEntryForm
          patientId={patient.id}
          diagnoses={diagnoses}
          onCancel={() => setEntryFormVisible(false)}
          onEntryAdded={onEntryAdded}
        />
      )}

      <Typography variant="h6" component="h3" fontWeight="bold" mt={1}>
        Entries
      </Typography>
      {patient.entries.map((e) => (
        <div key={e.id}>
          <EntryDetails entry={e} diagnoses={diagnoses} />
        </div>
      ))}
    </>
  );
};

export default PatientPage;
