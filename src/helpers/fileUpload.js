export const fileUpload = async (file) => {
  if (!file) return null;

  const cloudUrl = "https://api.cloudinary.com/v1_1/journal-reactapp/upload";
  const formData = new FormData();
  // se crea el objeto formData con el fin de enviar la imagen al servidor

  formData.append("upload_preset", "react-journal");

  // se agrega el preset de cloudinary que esto es el nombre de la co
  // nfiguracion que se hizo alla, donde se van a subir las imagenes

  formData.append("file", file);

  // se agrega el archivo que se va a subir, se le envia el archivo
  //  como parametro y el nombre del archivo
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    // se hace la peticion al servidor con el metodo post, que es el
    // que se encarga de subir los archivos al servidor,

    if (!resp.ok) throw new Error("Error uploading the file ");
    const cloudResp = await resp.json();

    // la respuesta que se obtiene del servidor se convierte en
    // formato json

    return cloudResp.secure_url;

    // se retorna la secure_url que la que contiene la imagen que se
    // subio en el servidor
  } catch (error) {
    // throw new Error(error.message);
    return null;
  }
};

//!  el post es para enviar informacion al servidor, el put es para actualizar informacion, el delete es para eliminar informacion, el patch es para actualizar informacion parcialmente, el HEAD es para obtener informacion de la cabecera de la respuesta, el options es para obtener informacion de las opciones de comunicacion que tiene el servidor
