import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // el getState es una funcion que devuelve el estado actual del store es una funcion de
    // redux, el dispatch es una funcion que permite despachar acciones.
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    // creamos una referencia para la coleccion de notas, esto con el fin de poder agregar una
    // nueva nota

    await setDoc(newDoc, newNote);
    // creamos la nueva nota, donde le enviamos la referencia del documento y la nota que
    // queremos agregaer por medio de la funcion setDoc de firebase.
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
    // despachamos las acciones para agregar la nueva nota y establecerla como activa.
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("No uid found");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;

    const { active: note } = getState().journal; // esta es la nota activa

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); // el id de la nota es el id del documento en firestore, lo obtenemos de la nota activa.
    await setDoc(docRef, noteToFireStore, { merge: true }); // docRef es la referencia al documento, noteToFireStore es la nota que queremos guardar, merge true es para que si no existe el documento lo cree.
    dispatch(updateNote(note));
  };
};
