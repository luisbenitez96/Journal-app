export const initialState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};
export const aunthenticatedState = {
  status: "authenticated",
  uid: "1234ABC",
  email: "luisbenitez@google.com ",
  displayName: "Demo User",
  photoURL: "https://demo-image.jpg",
  errorMessage: null,
};
export const notaunthenticatedState = {
  status: "not authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};
export const demoUser = {
  uid: "12345ABC",
  email: "user@google.com",
  displayName: "Demo User",
  photoURL: "https://demo.jpg",
};
