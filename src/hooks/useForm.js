import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});
  useEffect(() => {
    createValidators();
  }, [formState]);
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    // se utiliza useMemo para memorizar el valor de isFormValid y no se ejecute cada vez que se renderiza el componente, solo se ejecuta cuando el estado del formulario cambia
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false; // se recorre el objeto formValidation para verificar si hay algún campo que no cumpla con la validación, formValue es el campo del formulario.
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };
  const createValidators = () => {
    const formCheckedValue = {};
    for (const formField of Object.keys(formValidations)) {
      // se recorre el objeto formaValidations con el fin de obtener los campor del formulario

      const [fn, errorMessage = "Este campo es requerido"] =
        formValidations[formField];

      // se obtiene la funcion y el mensaje de error de cada campo del formulario desestructurando el objeto formValidations, fn es la funcion de validación y errorMessage es el mensaje de error

      formCheckedValue[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;

      // se ejecuta la funcion de validacion de cada campo del formulario y se guarda en el objeto formaCheckedValue, fn es la funcion de validación, formState es el estaddo actual del formulario y formField es el campo del formulario
    }
    setFormValidation(formCheckedValue);
  };

  return {
    ...formState, // se desestructura el estado del formulario para no perder los campos del formulario
    formState,
    onInputChange,
    onResetForm,
    ...formValidation, // se utiliza la desestructuración para obtener los campos del formulario y los campos de validación
    isFormValid,
  };
};
