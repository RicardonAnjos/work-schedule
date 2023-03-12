import { Box, ToggleButton, ToggleButtonGroup, Grid, TextField, Button, DialogActions } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface WorkSchedule {
  id: string;
  startTime: string;
  endTime: string;
  days: string[];
}

export function WorkSchedule() {
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3333/schedule')
      .then((response) => {     
        setWorkSchedule(response.data);
      });
  }, []);

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data.id);
    
    if (!data.id) {
      return;
    }

    try {
      await axios.put(`http://localhost:3333/schedule/${data.id}`, {
        startTime: data.startTime,
        endTime: data.endTime,
        days: weekDays.map(Number),
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleUpdate}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Box sx={{ display: 'flex', gap: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ToggleButtonGroup
              value={weekDays}
              aria-label="week days"
              onChange={(_, newWeekDays) => setWeekDays(newWeekDays)}
              size="large"
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
                <TextField label="" variant="outlined" type="time" fullWidth />
              </Grid>

              <Grid item xs={6}>
                <TextField label="" variant="outlined" type="time" fullWidth />
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
