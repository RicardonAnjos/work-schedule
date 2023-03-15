import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TimePicker from 'react-time-picker'

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
    event.preventDefault();
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
      <Box m={2} >
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{
            color: "#1a73e8",
            fontSize: 15,
            fontWeight: 300,
            mb: 2,
          }}>
            SELECIONE O DIA DA SEMANA
          </FormLabel>
          <FormGroup row sx={{ mt: 3 }}>
            {schedule.map((s) => (
              <FormControlLabel
                key={s.id}
                control={
                  <Checkbox
                    {...register("dayOfWeek")}
                    checked={dayOfWeek === s.day}
                    onChange={handleDayOfWeekChange}
                    name={s.day}
                    sx={{
                      color: "#1a73e8",
                      shapeRendering: "geometricPrecision",
                      "&.Mui-checked": {
                        color: "#1a73e8",
                      },
                    }}
                  />
                }
                label={s.day.slice(0, 3).toUpperCase()}
                labelPlacement="top"
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={5}>
          <TextField
            name="startTime"
            label="De"
            variant="filled"
            type="time"
            fullWidth
            sx={{
              mb: 2,
              mt: 2
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{}}
            onChange={handleStartTimeChange || undefined}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            name="endTime"
            label="Até"
            variant="filled"
            type="time"
            fullWidth
            sx={{
              mb: 2,
              mt: 2,
            }}
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
          onClick={handleSubmit(() => handleScheduleUpdate())}
          sx={{
            width: "100%",
            height: 50,
            mt: 2,
            mb: 2,
            ":hover": {
              backgroundColor: "#1a73e8",
            },
          }}
        >
          Salvar
        </Button>
      </Box>
    </>
  );
};

