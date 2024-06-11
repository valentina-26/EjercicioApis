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




//UPDATE
// export const updateAlbum = async () => {


//     const albumId = prompt("Ingrese el ID del álbum que desea modificar.");

//     const existe = await fetch(`http://172.16.101.146:5802/albums/${albumId}`);
//         const llamar = await existe.json();

//         if (llamar) {    

//             const option = parseInt(prompt("Opciones disponibles:\n1. userId\n2. title\nIngrese la opción:"));
//             const Opciones = (option === 1) ? "userId" : (option === 2) ? "title" : null;
            


//             if (!Opciones) {
//                 console.log("Opción no válida.");
//                 return "Opción no válida.";
//             }

//             const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
//             const updatedAlbum = { id: albumId, [Opciones]: newValue };



//                 const config = {
//                     method: "PUT",
//                     headers: {"Content-Type": "application/json"},
//                     body: JSON.stringify(updatedAlbum)
//                 };

//                 const response = await fetch(`http://172.16.101.146:5802/albums/${albumId}`, config);
//                 const data = await response.json();

//                 console.log("Álbum actualizado con éxito:", data);
                
//                 return data;
//             }else {
//                     console.log("El id no existe o es nulo.");
//                     return "El id no existe o es nulo.";}
//     }


    //PATCH 
    export const updateAlbum = async () => {
        const albumId = prompt("Ingrese el ID del álbum que desea modificar.");
    
        const existe = await fetch(`http://172.16.101.146:5802/albums/${albumId}`);
        const llamar = await existe.json();
    
        if (llamar) {
            const option = parseInt(prompt("Opciones disponibles:\n1. userId\n2. title\nIngrese la opción:"));
            const Opciones = (option === 1) ? "userId" : (option === 2) ? "title" : null;
    
            if (!Opciones) {
                console.log("Opción no válida.");
                return "Opción no válida.";
            }
    
            const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
            const updatedAlbum = { [Opciones]: newValue };
    
            const config = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedAlbum)
            };
    
            const response = await fetch(`http://172.16.101.146:5802/albums/${albumId}`, config);
            const data = await response.json();
    
            console.log("Álbum actualizado con éxito:", data);
            
            return data;
        } else {
            console.log("El ID no existe o es nulo.");
            return "El ID no existe o es nulo.";
        }
    }