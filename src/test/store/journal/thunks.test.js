import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../store/journal";
import { startNewNote } from "../../../store/journal/thunks";
import { FirebaseDB } from "../../../firebase/config";

describe("Pruebas en Journal Thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({
      auth: {
        uid: uid,
      },

      // el uid es el id del usuario que esta autenticado, el
      //  mockReturnValue devuelve el estado de la autenticacion
    });
    await startNewNote()(dispatch, getState); // se envia el dispatch y el getState para que la función pueda acceder al estado
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
      }) // se espera que se llame a la acción addNewEmptyNote con el objeto de la nueva nota
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
      })
    );
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
      // se crea un array vacio deletePromises para almacenar las promesas, despues se recorre
      // la coleccion con forEach para tenerlos separados, despues se utiliza
      // deletePromises.push para eliminar cada documento de la coleccion
      // se eliminan todas las notas de la colección después de la prueba
      // para evitar que queden notas de prueba en la base de datos
    });
    await Promise.all(deletePromises);
  });
});
