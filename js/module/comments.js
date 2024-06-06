import { getAllPostone } from "./post.js";

//GET
export const GetAllComments = async () => {
    let res = await fetch("https://jsonplaceholder.typicode.com/comments");
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

    let res = await fetch("https://jsonplaceholder.typicode.com/comments", config);
    let data = await res.json();
    return data;
}

//UPDATE (PUT)
export const updateComment = async(commentId, arg) => {
    let val = await validateUPDATEComments(arg);
    if (val) return val;
    let config = {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(arg)
    }

    let res = await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, config);
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

const validateUPDATEComments = async ({postId, name, email, body}) => {
    if (typeof name !== "string" || name === undefined) return { status: 406, message: "The name data is not arriving" };
    if (typeof email !== "string" || email === undefined) return { status: 406, message: "The email data is not arriving" };
    if (typeof body !== "string" || body === undefined) return { status: 406, message: "The body data is not arriving" };
    let id = await getAllPostone({ postId });
    if (id.status == 204) return { status: 200, message: "The postId to search does not exist" };
}




































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


