import { Box, Chip, Stack, Typography } from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealingIcon from "@mui/icons-material/Healing";

import type { Diagnosis, HospitalEntry } from "../../types.ts";
import EntryCardBase from "./EntryCardBase.tsx";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryCard = ({ entry, diagnoses }: Props) => {
  return (
    <EntryCardBase>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography fontWeight="bold">{entry.date}</Typography>
        <LocalHospitalIcon />
      </Stack>

      <Typography fontStyle="italic">{entry.description}</Typography>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
        <HealingIcon fontSize="small" />
        <Typography>
          discharged on {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
      </Stack>

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

export default HospitalEntryCard;
