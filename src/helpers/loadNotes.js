import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("No uid found");
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

  // se crea una referencia a la coleccion de notas para poder obtener las notas
  const docs = await getDocs(collectionRef);
  // se obtienen las notas de la coleccion de notas mediante la funcion de getDocs de firebase
  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  return notes;
};
