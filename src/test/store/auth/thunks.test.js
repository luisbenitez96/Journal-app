import {
  loginWithEmailPassword,
  logoutFirebase,
  signInWithGoogle,
} from "../../../firebase/provider";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../store/auth/thunks";
import { clearNotesLogout } from "../../../store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../firebase/provider");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  // se limpia el mock antes de cada prueba

  test("debe invocar el checkingCredential", async () => {
    await checkingAuthentication()(dispatch);

    // primer argumento es el llamado de la funcion y el segundo es el
    //  valor de retorno de la funcion

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("debe de llamar  el checkingCredentials y login - Exito", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };
    await signInWithGoogle.mockResolvedValue(loginData);

    // mockedResolvedValue sirve para simular el valor de retorno de una funcion
    // en este caso es la funcion signInWithGoogle
    // que retorna un objeto con la propiedad ok en true
    // y el resto de las propiedades de demoUser
    // el mockResolvedValue es una forma de simular el comportamiento de una funcion
    // se le pasa el valor  de retorno que se espera en este caso loginData

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });
  test(" startGoogleSignIn debe de llamar  el checkingCredentials y logout - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "error en Google",
    };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("starLoginAndEmailAndPassword debe llamar checkingCredencial y Login - Éxito ", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });
  test("startLogout debe llamar logoutFirebase , clearNotes logout", async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
