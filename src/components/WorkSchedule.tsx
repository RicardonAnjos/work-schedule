import { Box, ToggleButton, ToggleButtonGroup, Grid, TextField, Button, DialogActions } from '@mui/material';

import { FormEvent, useEffect, useState, useCallback, ChangeEvent, SetStateAction } from 'react';

import axios from 'axios';

interface WorkSchedule {
  id: string;
  startTime: string;
  endTime: string;
  days: string[];
}

export function WorkSchedule() {
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule[]>([]);
  const [weekDay, setWeekDay] = useState<string[]>([]);
  const [updatedSchedule, setUpdatedSchedule] = useState<WorkSchedule | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3333/schedule')
      .then((response) => {
        setWorkSchedule(response.data);
      });
  }, []);

  const handleScheduleUpdate = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!updatedSchedule) return;

    const { id, startTime, endTime, days } = updatedSchedule;

    try {
      await axios.put(`http://localhost:3333/schedule/${id}`, { startTime, endTime, days });

      setWorkSchedule((prevSchedule) =>
        prevSchedule.map((schedule) => {
          if (schedule.id === id) {
            return updatedSchedule;
          } else {
            return schedule;
          }
        })
      );

      setUpdatedSchedule(null);
      alert('Horário atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar horário!');
    }
  }, [updatedSchedule]);

  function handleStartTimeChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedDay = weekDay[0];
    setUpdatedSchedule((prevSchedule) =>
      prevSchedule ? { ...prevSchedule, startTime: event.target.value, days: [selectedDay] } : null
    );
  }

  function handleEndTimeChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedDay = weekDay[0];
    setUpdatedSchedule((prevSchedule) =>
      prevSchedule ? { ...prevSchedule, endTime: event.target.value, days: [selectedDay] } : null
    );
  }



  return (
    <form onSubmit={handleScheduleUpdate}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, backgroundColor: '-moz-initial' }}>
        <Box sx={{ display: 'flex', gap: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup
              aria-label="week days"
              size="large"
              value={weekDay}
              onChange={(_event, newValue) => setWeekDay(newValue as string[])}
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
                <TextField
                  onChange={handleStartTimeChange}
                  label="De"
                  variant="filled"
                  type="time"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Até"
                  variant="filled"
                  type="time"
                  onChange={handleEndTimeChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="De"
                  variant="filled"
                  type="time"
                  onChange={handleStartTimeChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Até"
                  variant="filled"
                  type="time"
                  onChange={handleEndTimeChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <DialogActions
              style={{ justifyContent: 'flex-end', marginLeft: 'auto' }}
            >
              <Button
                variant="contained"
                color="primary"
                size='large'
                type="submit"
                className="MuiButton-root MuiButton-contained bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 "
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
