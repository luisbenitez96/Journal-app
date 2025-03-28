import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "journal-reactapp",
  api_key: "383838269786786",
  api_secret: "UewVSBTN4kBlVEimtpRjjKpkjAo",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("debe subir los archivos correctamente a cloudinary", async () => {
    const imgUrl =
      "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQ15X_cjvjxIJZIcT3q01sTYhY1bojXUoa2Qym2iFh6B5Sd6coyYRz5DVVbSO4qgmtR5GlZ0m5qXmcraQ3Lz6A";
    const resp = await fetch(imgUrl);
    const blob = await resp.blob();

    // convertir la respuesta en un blob(binary large object ), el blob es un objeto que representa un archivo en
    // datos binarios, esto se hace para poder subir una imagen al servidor

    const file = new File([blob], "foto.jpg");

    // aqui se crea el archivo que se va a subir al servidor, se crea con el new File, se le
    // pasa el blob y el nombre del archivo.

    const url = await fileUpload(file);
    // aqui se llama a la funcion fileUpload que es la que se encarga de subir el archivo al
    // servidor

    expect(typeof url).toBe("string");
    // console.log(url);
    const segments = url.split("/");

    // el split separa la url en partes para poder obtener el id de la imagen

    const imageId = segments[segments.length - 1].replace(".jpg", "");

    // se obtiene el id de la imagen, para poder eliminar la imagen del servidor, se hace el
    // segement[segmente.lenght - 1] para obtener la ultima parte de la url, es el id de la
    // imagen y se remplaza .jpg por nada, para obtener el id solo de la imagen

    const cloudinaryResp = await cloudinary.api.delete_resources([imageId], {
      resource_type: "image",
    });
    // console.log(cloudinaryResp);

    // aqui se elimina la imagen del servidor, se hace con el api de cloudinary
  });

  test("debe retornar null", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
