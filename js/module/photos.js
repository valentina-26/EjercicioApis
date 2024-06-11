import { getAllAlbums } from "./albums.js";
import { validateGetUser, getUser } from './users.js';

//GET one
export const getOnePhotos = async (arg) => {
    let val = await validateGetUser(arg);
    if (val) return val;
    let user = await getUser(arg);
    if (user.status === 204) return user;
    let res = await fetch(`https://jsonplaceholder.typicode.com/photos/${arg.userId}`);
    if (res.status === 404) return { status: 204, message: 'post does not exist' };
    let data = await res.json();
    return data;
}

//GET all
export const getAllPhotos = async () => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    let data = await res.json();
    return data;
}

//ADD
export const AddPhotos = async(arg) => {
    let val = await validateAddPhotos(arg);
    if (val) return val;
    let config= {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch ("http://172.16.101.146:5803/photos", config);
    let data = await res.json();
    return data;
}



//VALIDACIONES
const validateAddPhotos = async ({ albumId, title, url, thumbnailUrl }) => {
    if (typeof albumId !== "string" || albumId === undefined) return { status: 406, message: "The albumId data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    if (typeof url !== "string" || url === undefined) return { status: 406, message: "The URL data is not arriving" };
    if (typeof thumbnailUrl !== "string" || thumbnailUrl === undefined) return { status: 406, message: "The thumbnail URL data is not arriving" };
    let album = await getAllAlbums();
    if (!album.some(a => a.id === albumId)) return { status: 204, message: "The album to search does not exist" };
}



const validateDeletePothos = async ({id}) => {
    if (typeof id !== "string"|| id === undefined) return { status: 406, message: "The photo id does not arriving "}
}


//DELETE
export const deletePhotos= async (arg) => {
    let val = await validateDeletePothos(arg);
    if (val) return val;
    let config = {
        method:"DELETE",
        headers:{"Content-type":"application/json"},
    }
    let res = await fetch(`http://172.16.101.146:5803/photos/${arg.id}`, config);
    if (res.status === 404) return { status: 204, message: `the photo you want to delete is not register in database` };
    let data = await res.json();
    data.status = 200 
    data.message=" The photo was deldete from database"
    return data;
}


//UPDATE
export const UPDATEPhoto = async () => {
    const photosId = prompt("Ingrese el ID del photo que desea modificar.");

   
        const existe = await fetch(`http://172.16.101.146:5803/photos/${photosId}`);
        const llamar = await existe.json();

        if (llamar) {
            const option = parseInt(prompt("Opciones disponibles:\n1. albumId\n2. title\n3. url\n4. thumbnailUrl\nIngrese la opción:"));
            const Opciones = (option === 1) ? "albumId" :
                             (option === 2) ? "title" :
                             (option === 3) ? "url" :
                             (option === 4) ? "thumbnailUrl" : null;

            if (!Opciones) {
                console.log("Opción no válida.");
                return "Opción no válida.";
            }

            const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
            llamar[Opciones] = newValue;

            const updatephoto = { ...llamar, id: photosId, [Opciones]: newValue };

            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatephoto)
            };

            const response = await fetch(`http://172.16.101.146:5803/photos/${photosId}`, config);
            const data = await response.json();

            console.log("Álbum actualizado con éxito:", data);
            return data;
        } else {
            console.log("El id no existe o es nulo.");
            return "El id no existe o es nulo.";
        }
  
    }

    
//PATCH
// export const UPDATEPhoto = async () => {
//     const photosId = prompt("Ingrese el ID de la foto que desea modificar.");

//     const existe = await fetch(`http://172.16.101.146:5803/photos/${photosId}`);
//     const llamar = await existe.json();

//     if (llamar) {
//         const option = parseInt(prompt("Opciones disponibles:\n1. albumId\n2. title\n3. url\n4. thumbnailUrl\nIngrese la opción:"));
//         const Opciones = (option === 1) ? "albumId" :
//                          (option === 2) ? "title" :
//                          (option === 3) ? "url" :
//                          (option === 4) ? "thumbnailUrl" : null;

//         if (!Opciones) {
//             console.log("Opción no válida.");
//             return "Opción no válida.";
//         }

//         const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
//         const updatephoto = { [Opciones]: newValue };

//         const config = {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatephoto)
//         };

//         const response = await fetch(`http://172.16.101.146:5803/photos/${photosId}`, config);
//         const data = await response.json();

//         console.log("Foto actualizada con éxito:", data);
//         return data;
//     } else {
//         console.log("El ID no existe o es nulo.");
//         return "El ID no existe o es nulo.";
//     }
// }