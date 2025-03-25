import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, photoURL, displayName } = user;
      dispatch(login({ uid, email, photoURL, displayName }));
      dispatch(startLoadingNotes());
    });
  }, []);
  return status;
};

// en este caso se esta creando un hook que se encarga de verificar si el usuario esta autenticado o no, para eso se esta utilizando el onAuthStateChanged que es una funcion de firebase que se encarga de verificar si el usuario esta autenticado o no, es un observable, los observables son funciones que se ejecutan cuando algo cambia, en este caso el usuario se autentica o no, si el usuario no esta autenticado se ejecuta la funcion dispatch(logout()), si el usuario esta autenticado se ejecuta la funcion dispatch(login({ uid, email, photoURL, displayName })), el hook se esta utilizando en el componente AppRouter.jsx

// en el dispatch(login({ uid, email, photoURL, displayName })); se esta enviando un objeto con la informacion del usuario que se esta autenticando, el uid es el id del usuario, el email es el correo electronico del usuario, el photoURL es la url de la foto de perfil del usuario, el displayName es el nombre del usuario.
