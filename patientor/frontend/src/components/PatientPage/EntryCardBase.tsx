import { Card, CardContent } from "@mui/material";

const EntryCardBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1.5,
        borderRadius: 2,
        borderColor: "grey.500",
      }}
    >
      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default EntryCardBase;
