import { getUser } from "./users.js";

//GET one
export const getAllPostone = async (arg) => {
    let val = await validateAddPost(arg);
    if (val) return val;
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${arg.postId}`);
    if (res.status === 404) return { status: 204, message: 'Post does not exist' };
    let data = await res.json();
    return data;
}

//GET
export const getAllPost = async () => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    let data = await res.json();
    return data;
}

//ADD
export const AddPost = async (arg) => {
    let val = await validateAddPost(arg);
    if (val) return val;
    let config = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(arg)
    }
    let res = await fetch("http://172.16.101.146:5800/posts", config);
    let data = await res.json();
    return data;
}


//VALIDACIONES
const validateAddPost = async ({ userId, title, body }) => {
    if (typeof userId !== "string" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    if (typeof body !== "string" || body === undefined) return { status: 406, message: "The body data is not arriving" };
    let user = await getUser({ userId });
    if (user.status == 204) return { status: 200, message: "The user to search does not exist" };
}




const validateDeletePost = async ({ id }) => {
    if (typeof id !== "string" || id === undefined) return { status: 406, message: "The post id does not arrive" };
};



//DELETE
export const deletePost = async (arg) => {
    let val = await validateDeletePost(arg);
    if (val) return val;
    let config = {
        method:"DELETE",
        headers:{"Content-type":"application/json"},
    }
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${arg.id}`, config);
    if (res.status === 404) return { status: 404, message: `The post with ID ${arg.id} does not exist in the database` };
    let data = await res.json();
    data.status = 200;
    data.message = "The post was deleted from the database";
    return data;
}


//UPDATE
export const updatePost = async () => {


    const postId = prompt("Ingrese el ID del álbum que desea modificar.");
    const option = parseInt(prompt("Opciones disponibles:\n1. userId\n2. title   \n2. body \nIngrese la opción:"));
    const Opciones = (option === 1) ? "userId" : (option === 2) ? "title" :(option===3) ? "body" : null;
    


    if (!Opciones) {
        console.log("Opción no válida.");
        return "Opción no válida.";
    }

    const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
    const updatedAlbum = { id: postId, [Opciones]: newValue };


        const config = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedAlbum)
        };

        const response = await fetch(`http://172.16.101.146:5802/albums/${postId}`, config);
        const data = await response.json();

        console.log("Álbum actualizado con éxito:", data);
        
        return data;
    }

// //UPDATE (PUT)
// export const updatePost = async (id, arg) => {
//     let val = await validateUPDATEPost(arg);
//     if (val) return val;
//     let config = {
//         method: "PUT",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(arg)
//     }
//     let res = await fetch(`http://172.16.101.146:5800/posts/${id}`, config);
//     let data = await res.json();
//     return data;
// }


// const validateUPDATEPost = async ({ id,userId, title, body }) => {
//     if (typeof id !== "string" || id == undefined) return {status: 406, message: "The data id is not arriving"}
//     if (typeof userId !== "string" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
//     if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
//     if (typeof body !== "string" || body === undefined) return { status: 406, message: "The body data is not arriving" };
//     let user = await getUser({ userId });
//     if (user.status == 204) return { status: 200, message: "The user to search does not exist" };
// }