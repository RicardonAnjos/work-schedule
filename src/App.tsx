import { Card, CardContent } from "@mui/material";

import { WorkSchedule } from "./components/WorkSchedule";

export function App() {

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#1111111" }}>
      <Card sx={{ maxWidth: 1200 }}>
        <CardContent sx={{ py: 8, px: 10 }}>
          <WorkSchedule />
        </CardContent>
      </Card>
    </div>
  );
}