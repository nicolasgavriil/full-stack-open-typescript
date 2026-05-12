import { Box, Chip, Stack, Typography } from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import type { Diagnosis, OccupationalHealthcareEntry } from "../../types.ts";
import EntryCardBase from "./EntryCardBase.tsx";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryCard = ({ entry, diagnoses }: Props) => {
  return (
    <EntryCardBase>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography fontWeight="bold">{entry.date}</Typography>
        <WorkIcon />
        <Typography fontWeight="bold">{entry.employerName}</Typography>
      </Stack>

      <Typography fontStyle="italic">{entry.description}</Typography>

      {entry.sickLeave && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <EventAvailableIcon fontSize="small" />
          <Typography>
            sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        </Stack>
      )}

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

export default OccupationalHealthcareEntryCard;
