import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { ImageGallery } from "../components";

export const NoteView = () => {
  return (
    <Grid
      className="animate_animated animate_fadeIn animate_faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          13 de Marzo, 2025
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un Título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="¿Que sucedio hoy?"
          rows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
