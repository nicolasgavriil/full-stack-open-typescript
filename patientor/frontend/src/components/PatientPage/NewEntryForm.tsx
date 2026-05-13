import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import patientService from "../../services/patients.ts";

import axios from "axios";

interface NewEntryFormProps {
  patientId: string;
}

const NewEntryForm = ({ patientId }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");

  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("HealthCheck");

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const resetFields = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthRating("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
  };

  const buildEntryObject = () => {
    const parsedDiagnosisCodes = diagnosisCodes
      .split(",")
      .map((code) => code.trim())
      .filter(Boolean);

    const base = {
      date,
      description,
      specialist,
      ...(parsedDiagnosisCodes.length > 0 && {
        diagnosisCodes: parsedDiagnosisCodes,
      }),
    };

    switch (type) {
      case "HealthCheck":
        return {
          ...base,
          type: "HealthCheck",
          healthCheckRating: Number(healthRating),
        };

      case "OccupationalHealthcare":
        return {
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          ...((sickLeaveStart || sickLeaveEnd) && {
            sickLeave: {
              startDate: sickLeaveStart,
              endDate: sickLeaveEnd,
            },
          }),
        };

      case "Hospital":
        return {
          ...base,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };

      default:
        throw new Error(`Unknown entry type: ${type}`);
    }
  };

  const addEntry = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const entryToAdd = buildEntryObject();
      console.log("entry:", entryToAdd);
      await patientService.addEntry(entryToAdd, patientId);
      resetFields();
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
        New Entry
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        select
        label="Entry type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 1 }}
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
      </TextField>
      <TextField
        label="Date"
        required
        fullWidth
        size="small"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 1 }}
      />

      <TextField
        label="Description"
        required
        fullWidth
        size="small"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 1 }}
      />

      <TextField
        label="Specialist"
        required
        fullWidth
        size="small"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        sx={{ mb: 1 }}
      />

      {type === "HealthCheck" && (
        <TextField
          label="Health Check Rating (0-3)"
          required
          fullWidth
          size="small"
          value={healthRating}
          onChange={(e) => setHealthRating(e.target.value)}
          sx={{ mb: 1 }}
        />
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer Name"
            required
            fullWidth
            size="small"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Sick leave
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Start date"
                size="small"
                fullWidth
                value={sickLeaveStart}
                onChange={(e) => setSickLeaveStart(e.target.value)}
                sx={{ mb: 1 }}
              />

              <TextField
                label="End date"
                size="small"
                fullWidth
                value={sickLeaveEnd}
                onChange={(e) => setSickLeaveEnd(e.target.value)}
                sx={{ mb: 1 }}
              />
            </Box>
          </Box>
        </>
      )}

      {type === "Hospital" && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Discharge
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="date"
              size="small"
              fullWidth
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              sx={{ mb: 1 }}
            />

            <TextField
              label="Criteria"
              size="small"
              fullWidth
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              sx={{ mb: 1 }}
            />
          </Box>
        </Box>
      )}

      <TextField
        label="Diagnosis Codes (comma-separated)"
        fullWidth
        size="small"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
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
