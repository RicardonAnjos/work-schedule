import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Grid,
} from "@mui/material";

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export const WorkSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { register, handleSubmit, reset } = useForm();

  const loadSchedule = async () => {
    try {
      const response = await axios.get<Schedule[]>("http://localhost:5555/schedule");
      console.log(response.data);

      setSchedule(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar horários de trabalho.");
    }
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const handleDayOfWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeek(event.target.name);
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleScheduleUpdate = async () => {
    try {
      const sId = schedule.find((s) => s.day === dayOfWeek)?.id;

      const response = await axios.put<Schedule>(`http://localhost:5555/schedule/${sId}`, {
        startTime,
        endTime,
      });
      setSchedule((oldSchedule) =>
        oldSchedule.map((s) => (s.id === response.data.id ? response.data : s))
      );
      console.log(response.data);
      alert("Horário de trabalho atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar horário de trabalho.");
    }
  };

  return (
    <>
      <Box m={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Dias da semana:</FormLabel>
          <FormGroup row>
            {
              schedule.map((s) => (
                <FormControlLabel
                  key={s.id}
                  control={
                    <Checkbox
                      {...register("dayOfWeek")}
                      checked={dayOfWeek === s.day}
                      onChange={handleDayOfWeekChange}
                      name={s.day}
                    />
                  }
                  label={s.day.slice(0, 3)}
                  labelPlacement="top"
                />
              ))
            }
          </FormGroup>
        </FormControl>
      </Box>
      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={3}>
          <TextField
            // value={startTime}
            label="De"
            variant="filled"
            type="time"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleStartTimeChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            // value={endTime}
            label="Até"
            variant="filled"
            type="time"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleEndTimeChange}
          />
        </Grid>
      </Grid>
      <Box m={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={
            handleSubmit(() => handleScheduleUpdate())
          }
        >
          Salvar
        </Button>
      </Box>
      <Box m={2}>
      </Box>
    </>
  );
};

