import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
const formData = {
  email: "",
  password: " ",
  displayName: "",
};
const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe tener un @."],
  password: [
    (value) => value.length >= 6,
    "el password debe tener al menos 6 carácteres. ",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    displayName,
    formState,
    onInputChange,
    email,
    password,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    // el formState es el estado actual del formulario, esta ubicado en el hook useForm
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };
  return (
    <AuthLayout title="Crear cuenta">
      <h1>FormValid: {isFormValid ? "Válido" : "Incorrecto "}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo "
              type="text"
              placeholder="Luis Benitez"
              fullWidth
              name="displayName"
              // es el nombre que se le da al campo y sirve para identificarlo en el
              //  formulario
              value={displayName}
              // es el valor que se le asigna al campo y sirve para mostrarlo en el campo y
              //  obtener sus valores
              onChange={onInputChange}
              // es la funcion que se ejecuta cuando se cambia el
              // valor del campo , cada que se cambia el valor se
              // ejecuta esta funcion
              helperText={displayNameValid}
              error={!!displayNameValid && formSubmitted}

              // se utiliza la doble negación para convertir en valor booleano el valor de
              // displayNameValid si es igual a true se muestra el error y formSubmitted es
              //  igual a true si se ha enviado el formulario, como hay un && se deben cumplir
              //  las dos condiciones para que se muestre el error
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted} // se utiliza la doble negación para convertir en valor booleano el valor de passwordValid es igual a true si exist error de validación
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta ?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
