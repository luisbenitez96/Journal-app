import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../store/auth/authSlice";
import {
  aunthenticatedState,
  demoUser,
  initialState,
} from "../../fixtures/authFixtures";

describe("Pruebas en el authSlice", () => {
  test("debe regresar el estado inicial y llamarse 'auth' ", () => {
    const state = authSlice.reducer(initialState, {}); // el objeto vacio es la accion que se va a realizar

    // se verifica que el estado inicial sea el mismo que se pasa por el argumento

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });
  test("debe realizar la autenticacion", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });
  test("Debe realizar el logout", () => {
    const state = authSlice.reducer(aunthenticatedState, logout());

    expect(state).toEqual({
      status: "not authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });
  test("debe realizar el logout y mostrar mensaje de error", () => {
    const errorMessage = "Credenciales no validas";

    const state = authSlice.reducer(
      aunthenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      status: "not authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });
  test("debe cambiar el estado a checking", async () => {
    const state = authSlice.reducer(aunthenticatedState, checkingCredentials());

    expect(state.status).toBe("checking");
  });
});
