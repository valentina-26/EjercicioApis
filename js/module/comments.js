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


export const updateComment = async () => {


    const commentID = prompt("Ingrese el ID del comment que desea modificar.");
    const option = parseInt(prompt("Opciones disponibles: \n1. postId   \n2. name  \n3. email  \n4. body  \nIngrese la opción:"));
    const Opciones = (option === 1) ? "postId" : (option === 2) ? "name":(option === 3) ? "email" : (option === 4) ? "body" : null;
    


    if (!Opciones) {
        console.log("Opción no válida.");
        return "Opción no válida.";
    }

    const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
    const updatedAlbum = { id: commentID, [Opciones]: newValue };


        const config = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedAlbum)
        };

        const response = await fetch(`http://172.16.101.146:5801/comments/${commentID}`, config);
        const data = await response.json();
        console.log("Comment actualizado con éxito:", data);
        
        return data;
    }






// /UPDATE (PUT)
// export const updateComment = async(id, arg) => {
//     let val = await validateUPDATEComments(arg);
//     if (val) return val;
//     let config = {
//         method: "PUT",
//         headers: {"Content-type": "application/json"},
//         body: JSON.stringify(arg)
//     }

//     let res = await fetch(`http://172.16.101.146:5801/comments/${id}`, config);
//     let data = await res.json();
//     return data;
// }const validateUPDATEComments = async ({postId, name, email, body}) => {
//     if (typeof name !== "string" || name === undefined) return { status: 406, message: "The name data is not arriving" };
//     if (typeof email !== "string" || email === undefined) return { status: 406, message: "The email data is not arriving" };
//     if (typeof body !== "string" || body === undefined) return { status: 406, message: "The body data is not arriving" };
//     let id = await getAllPostone({ postId });
//     if (id.status == 204) return { status: 200, message: "The postId to search does not exist" };
// }






























// import { getAllPostone } from "./post.js";

// //GET
// export const GetAllComments = async () => {
//     let res = await fetch ("https://jsonplaceholder.typicode.com/comments");
//     let data = await res.json();
//     return data;
// }

// //ADD
// export const AddComments = async(arg) => {
//     let val = await validateAddComments(arg);
//     if (val) return val;
//     let config = {
//         method:"POST",
//         headers: {"Content-type":"application/json"},
//         body: JSON.stringify(arg)
//     }

//     let res = await fetch ("https://jsonplaceholder.typicode.com/comments",config)
//     let data = await res.json()
//     return data;
// }

// //VALIDACIONES
// export {getAllPostone} from "./post.js";
// const validateAddComments = async ({postId,name,email,body, }) => {
//    // if (typeof postId !== "number" || postId === undefined) return{status:406, message: "The postId data is not arriving"}
//     if(typeof name !== "string" || name === undefined ) return{status:406, message: "The name data is not arriving"}
//     if(typeof email !== "string" || email === undefined ) return {status:406, message: "The Email data is not arriving"}
//     if (typeof body !== "string" || body === undefined) return {status:406, message: "The body data is not arriving"}
//     let id = await(getAllPostone)({postId});
//     if(id.status == 204) return{status: 200, message: `The postId to search does not exist`}
// }


