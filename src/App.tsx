import { Card, CardContent, Typography } from "@mui/material";
import { WorkSchedule } from "./components/WorkSchedule";

export function App() {

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card sx={{ maxWidth: 480 }}>
        <CardContent sx={{ py: 8, px: 10 }}>
          <WorkSchedule />
        </CardContent>
      </Card>
    </div>
  );
}