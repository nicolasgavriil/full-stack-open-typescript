import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Box, Typography } from "@mui/material";
import type { Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

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

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default PatientPage;
