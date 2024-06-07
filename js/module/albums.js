import { getUser } from "./users.js";

//GET
export const getAllAlbums = async()=>{
    let res = await fetch("http://172.16.101.146:5802/albums");
    let data = await res.json();
    return data;
}

//ADD
export const AddAlbum = async(arg)=>{
    let val = await validateAddAlbum(arg);
    if (val) return val;
    let config= {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(arg)
    }

    let res = await fetch("http://172.16.101.146:5802/albums", config);
    let data = await res.json();
    data.status = 201
    return data;
}



//VALIDACIONES
const validateAddAlbum = async({userId, title})=> {
    if (typeof userId !== "string" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    let album = await getUser({ userId });
    if (album.status == 204) return { status: 200, message: "The user to search does not exist" };
}



const validateDeleteAlbum = async ({id}) => {
    if (typeof id !== "string"|| id === undefined) return { status: 406, message: "The album id does not arriving "}
}


//DELETE
export const deleteAlbum = async (arg) => {
    let val = await validateDeleteAlbum(arg);
    if (val) return val;
    let config = {
        method:"DELETE",
        headers:{"Content-type":"application/json"},
    }
    let res = await fetch(`http://172.16.101.146:5802/albums/${arg.id}`, config);
    if (res.status === 404) return { status: 204, message: `the album you want to delete is not register in database` };
    let data = await res.json();
    data.status = 200 
    data.message=" The album was deldete from database"
    return data;
}











export const updateAlbum = async () => {


    const albumId = prompt("Ingrese el ID del álbum que desea modificar.");
    const option = parseInt(prompt("Opciones disponibles:\n1. userId\n2. title\nIngrese la opción:"));
    const Opciones = (option === 1) ? "userId" : (option === 2) ? "title" : null;
    


    if (!Opciones) {
        console.log("Opción no válida.");
        return "Opción no válida.";
    }

    const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
    const updatedAlbum = { id: albumId, [Opciones]: newValue };



        const config = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedAlbum)
        };

        const response = await fetch(`http://172.16.101.146:5802/albums/${albumId}`, config);
        const data = await response.json();

        console.log("Álbum actualizado con éxito:", data);
        
        return data;
    }




// export const updateAlbum = async () => {
//     let id = prompt("Ingrese el ID del álbum que desea modificar.");

//     let opciones = "Opciones disponibles:\n1. userId\n2. title";
//     let opcion = parseInt(prompt(`${opciones}\nIngrese la opción:`));

//     let llaveAModificar;
//     if (opcion === 1) {
//         llaveAModificar = "userId";
//     } else if (opcion === 2) {
//         llaveAModificar = "title";
//     } else {
//         return "Opción no válida.";
//     }

//     let nuevoValor = prompt(`Ingrese el nuevo valor para ${llaveAModificar}:`);
//     let albumActualizado = { id, [llaveAModificar]: nuevoValor };

//     let confirmacion = confirm(`¿Está seguro que desea actualizar este álbum?\n${JSON.stringify(albumActualizado)}`);

//     if (confirmacion) {
//         let config = {
//             method: "PUT",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(albumActualizado)
//         };
//         let res = await fetch(`http://172.16.101.146:5802/albums/${id}`, config);
//         let data = await res.json();
//         return data;
//     }
// }


// //UPDATE (PUT)
// export const updateAlbum = async(id, arg)=>{
//     let val = await validateUPDATEAlbum(arg);
//     if (val) return val;
//     let config= {
//         method:"PUT",
//         headers:{"Content-type":"application/json"},
//         body: JSON.stringify(arg)
//     }

//     let res = await fetch(`http://172.16.101.146:5802/albums/${id}`, config);
//     let data = await res.json();
//     return data;
// }

// const validateUPDATEAlbum = async({id, userId, title})=> {
//     if (typeof id !== "string" || id == undefined) return {status: 406, message: "The data id is not arriving"}
//     if (typeof userId !== "string" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
//     if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
//     let user = await getUser({ userId });
//     if (user.status == 204) return { status: 200, message: "The album to search does not exist" };
// }