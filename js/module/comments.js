import { getAllPostone } from "./post.js";

//GET
export const GetAllComments = async () => {
    let res = await fetch("http://172.16.101.146:5801/comments");
    let data = await res.json();
    return data;
}

//ADD
export const AddComments = async(arg) => {
    let val = await validateAddComments(arg);
    if (val) return val;
    let config = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(arg)
    }

    let res = await fetch("http://172.16.101.146:5801/comments", config);
    let data = await res.json();
    return data;
}



//VALIDACIONES
const validateAddComments = async ({postId, name, email, body}) => {
    if (typeof name !== "string" || name === undefined) return { status: 406, message: "The name data is not arriving" };
    if (typeof email !== "string" || email === undefined) return { status: 406, message: "The email data is not arriving" };
    if (typeof body !== "string" || body === undefined) return { status: 406, message: "The body data is not arriving" };
    let id = await getAllPostone({ postId });
    if (id.status == 204) return { status: 200, message: "The postId to search does not exist" };
}



const validateDeleteComments = async ({id}) => {
    if (typeof id !== "string"|| id === undefined) return { status: 406, message: "The comment id does not arriving "}
}

//DELETE
export const deleteComments = async (arg) => {
    let val = await validateDeleteComments(arg);
    if (val) return val;
    let config = {
        method:"DELETE",
        headers:{"Content-type":"application/json"},
    }
    let res = await fetch(`http://172.16.101.146:5801/comments/${arg.id}`, config);
    if (res.status === 404) return { status: 204, message: `the comment you want to delete is not register in database` };
    let data = await res.json();
    data.status = 200 
    data.message=" The comment was deldete from database"
    return data;
}

//UPDATE
// export const updateComment = async () => {


//     const commentID = prompt("Ingrese el ID del comment que desea modificar.");

//     const existe = await fetch(`http://172.16.101.146:5801/comments/${commentID}`);
//     const llamar = await existe.json();

//     if(llamar){
//         const option = parseInt(prompt("Opciones disponibles: \n1. postId   \n2. name  \n3. email  \n4. body  \nIngrese la opción:"));
//         const Opciones = (option === 1) ? "postId" : (option === 2) ? "name":(option === 3) ? "email" : (option === 4) ? "body" : null;
        


//         if (!Opciones) {
//             console.log("Opción no válida.");
//             return "Opción no válida.";
//         }

//         const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
//         const updatedAlbum = { ...llamar, id: commentID, [Opciones]: newValue };


//             const config = {
//                 method: "PUT",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(updatedAlbum)
//             };

//             const response = await fetch(`http://172.16.101.146:5801/comments/${commentID}`, config);
//             const data = await response.json();

//             console.log("Comment actualizado con éxito:", data);
            
//             return data;
//         } else {
//             console.log("El id no existe o es nulo.");
//             return "El id  no existe o es nulo.";
//         }
//     }

    
// //PATCH
export const updateComment = async () => {
    const commentID = prompt("Ingrese el ID del comentario que desea modificar.");

    const existe = await fetch(`http://172.16.101.146:5801/comments/${commentID}`);
    const llamar = await existe.json();

    if (llamar) {
        const option = parseInt(prompt("Opciones disponibles: \n1. postId   \n2. name  \n3. email  \n4. body  \nIngrese la opción:"));
        const Opciones = (option === 1) ? "postId" : (option === 2) ? "name" : (option === 3) ? "email" : (option === 4) ? "body" : null;

        if (!Opciones) {
            console.log("Opción no válida.");
            return "Opción no válida.";
        }

        const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
        const updatedComment = { [Opciones]: newValue };

        const config = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedComment)
        };

        const response = await fetch(`http://172.16.101.146:5801/comments/${commentID}`, config);
        const data = await response.json();

        console.log("Comentario actualizado con éxito:", data);
        
        return data;
    } else {
        console.log("El ID no existe o es nulo.");
        return "El ID no existe o es nulo.";
    }
}
