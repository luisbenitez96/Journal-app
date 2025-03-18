import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code; // el error.code es el codigo del error
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};
export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  console.log({ email, password, displayName });
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    ); // se crea el usuario con el email y password enm firebase, con la funcion.
    //  createUserWithEmailAndPassword, se le envia el FirebaseAuth que este lo trae de la
    //  configuracion de firebase en el archivo config.js y se envia el email y password desde
    //  el formulario
    const { uid, photoURL } = resp.user;
    // el user es el usuario que se crea con el email y password
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    console.log(resp);
    const { uid, photoURL, displayName } = resp.user;
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
