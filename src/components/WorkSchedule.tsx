import { Box, ToggleButton, ToggleButtonGroup, Grid, TextField, Button, DialogActions } from '@mui/material';

import { FormEvent, useEffect, useState, useCallback, ChangeEvent, SetStateAction } from 'react';

import axios from 'axios';

interface WorkSchedule {
  id: string;
  startTime: string;
  endTime: string;
  day: string;
}

export function WorkSchedule() {
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule[]>([]);
  const [day, setDay] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');


  useEffect(() => {
    axios.get('http://localhost:5555/schedule')
      .then((response) => {
        setWorkSchedule(response.data);
        console.log(response.data);

      });
  }, []);

  const handleScheduleUpdate = async () => {
    const data = {
      day,
      startTime,
      endTime,
    };

    await axios.put(`http://localhost:5555/schedule/${workSchedule[0].id}`, data);
  }

  return (
    <form onSubmit={handleScheduleUpdate}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, backgroundColor: '-moz-initial' }}>
        <Box sx={{ display: 'flex', gap: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup
              aria-label="week days"
              size="large"
              value={day}
              onChange={
                (event: ChangeEvent<{}>, newDay: SetStateAction<string>) => {
                  setDay(newDay);
                }
              }
            >
              <ToggleButton value="Seqgunda" aria-label="Segunda">
                S
              </ToggleButton>
              <ToggleButton value="Terça" aria-label="Terça">
                T
              </ToggleButton>
              <ToggleButton value="Quarta" aria-label="Quarta">
                Q
              </ToggleButton>
              <ToggleButton value="Quinta" aria-label="Quinta">
                Q
              </ToggleButton>
              <ToggleButton value="Sexta" aria-label="Sexta">
                S
              </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="startTime"
                  label="De"
                  variant="filled"
                  type="time"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={ 
                    (event: ChangeEvent<HTMLInputElement>) => {
                      setStartTime(event.target.value);
                    }
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="endTime"
                  label="Até"
                  variant="filled"
                  type="time"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={
                    (event: ChangeEvent<HTMLInputElement>) => {
                      setEndTime(event.target.value);
                    }
                  }
                />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
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
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid> */}
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
