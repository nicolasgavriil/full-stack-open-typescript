import { Box, Chip, Stack, Typography } from "@mui/material";

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

import type { Diagnosis, HealthCheckEntry } from "../../types.ts";
import EntryCardBase from "./EntryCardBase.tsx";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryCard = ({ entry, diagnoses }: Props) => {
  const getHealthColor = (rating: HealthCheckEntry["healthCheckRating"]) => {
    switch (rating) {
      case 0:
        return "success";
      case 1:
        return "info";
      case 2:
        return "warning";
      case 3:
        return "error";
      default:
        return "default";
    }
  };

  const getHealthLabel = (rating: HealthCheckEntry["healthCheckRating"]) => {
    switch (rating) {
      case 0:
        return "Healthy";
      case 1:
        return "Low risk";
      case 2:
        return "High risk";
      case 3:
        return "Critical risk";
      default:
        return "Unknown";
    }
  };

  return (
    <EntryCardBase>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography fontWeight="bold">{entry.date}</Typography>
        <MonitorHeartIcon />
        <Chip
          size="small"
          label={getHealthLabel(entry.healthCheckRating)}
          color={getHealthColor(entry.healthCheckRating)}
        />
      </Stack>

      <Typography fontStyle="italic">{entry.description}</Typography>

      {entry.diagnosisCodes && (
        <Box sx={{ mt: 1 }}>
          {entry.diagnosisCodes.map((code) => (
            <Chip
              key={code}
              size="small"
              label={`${code} ${diagnoses.find((d) => d.code === code)?.name ?? ""}`}
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>
      )}

      <Typography sx={{ mt: 1 }}>diagnose by {entry.specialist}</Typography>
    </EntryCardBase>
  );
};

export default HealthCheckEntryCard;
