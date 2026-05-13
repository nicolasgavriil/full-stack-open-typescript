import { useState } from "react";

import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import patientService from "../../services/patients.ts";

import axios from "axios";

interface NewEntryFormProps {
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  patientId: string;
}

const NewEntryForm = ({ patientId }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const addEntry = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedDiagnosisCodes = diagnosisCodes
        .split(",")
        .map((code) => code.trim())
        .filter(Boolean);
      const entryToAdd = {
        type: "HealthCheck",
        date,
        description,
        specialist,
        healthCheckRating: Number(healthRating),
        ...(parsedDiagnosisCodes.length > 0 && {
          diagnosisCodes: parsedDiagnosisCodes,
        }),
      };
      await patientService.addEntry(entryToAdd, patientId);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;

        console.log("axios error data:", data);
        showError(`${data.error[0].path}: ${data.error[0].message}`);
      } else {
        console.error("Unknown error", e);
        showError("Unknown error");
      }
    }
  };

  const onCancel = () => {};

  return (
    <Box
      component="form"
      onSubmit={addEntry}
      sx={{
        border: "2px dotted",
        borderColor: "grey.700",
        p: 2,
        mt: 2,
        mb: 2,
        maxWidth: 650,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        New HealthCheck Entry
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Date"
        required
        fullWidth
        size="small"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        sx={{ mb: 1 }}
      />

      <TextField
        label="Description"
        required
        fullWidth
        size="small"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        sx={{ mb: 1 }}
      />

      <TextField
        label="Specialist"
        required
        fullWidth
        size="small"
        value={specialist}
        onChange={(event) => setSpecialist(event.target.value)}
        sx={{ mb: 1 }}
      />

      <TextField
        label="Health Check Rating (0-3)"
        required
        fullWidth
        size="small"
        value={healthRating}
        onChange={(event) => setHealthRating(event.target.value)}
        sx={{ mb: 1 }}
      />

      <TextField
        label="Diagnosis Codes (comma-separated)"
        fullWidth
        size="small"
        value={diagnosisCodes}
        onChange={(event) => setDiagnosisCodes(event.target.value)}
        sx={{ mb: 1.5 }}
      />

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained">
          Add
        </Button>

        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default NewEntryForm;
