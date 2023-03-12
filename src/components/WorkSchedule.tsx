import { Box, ToggleButton, ToggleButtonGroup, Grid, TextField, Button, DialogActions } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface WorkScheduleProps {
  id: string;
  startTime: string;
  endTime: string;
  days: number[];
}

export function WorkSchedule() {
  const [workSchedule, setWorkSchedule] = useState<WorkScheduleProps[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  const handleWeekDaysChange = (event: React.MouseEvent<HTMLElement>, newWeekDays: string[]) => {
    setWeekDays(newWeekDays);
  };

  useEffect(() => {
    axios.get('http://localhost:3333/schedule')
      .then((response) => {
        setWorkSchedule(response.data);
      });
  }, []); // adicionamos um array vazio para que o useEffect só execute uma vez, quando o componente for montado

  return (
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Box sx={{ display: 'flex', gap: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ToggleButtonGroup
              value={weekDays}
              onChange={handleWeekDaysChange}
              aria-label="week days"
              size="small"
            >
              <ToggleButton value="1" aria-label="Segunda">
                S
              </ToggleButton>
              <ToggleButton value="2" aria-label="Terça">
                T
              </ToggleButton>
              <ToggleButton value="3" aria-label="Quarta">
                Q
              </ToggleButton>
              <ToggleButton value="4" aria-label="Quinta">
                Q
              </ToggleButton>
              <ToggleButton value="5" aria-label="Sexta">
                S
              </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="De" variant="outlined" type="time" fullWidth />
              </Grid>

              <Grid item xs={6}>
                <TextField label="Até" variant="outlined" type="time" fullWidth />
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600"
              >
                Salvar
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
