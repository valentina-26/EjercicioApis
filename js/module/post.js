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
    let res = await fetch("https://jsonplaceholder.typicode.com/posts", config);
    let data = await res.json();
    return data;
}

//UPDATE (PUT)
export const updatePost = async (postId, arg) => {
    let val = await validateUPDATEPost(arg);
    if (val) return val;
    let config = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(arg)
    }
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, config);
    let data = await res.json();
    return data;
}

//VALIDACIONES
const validateAddPost = async ({ userId, title, body }) => {
    if (typeof userId !== "number" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    if (typeof body !== "string" || body === undefined) return { status: 406, message: "The body data is not arriving" };
    let user = await getUser({ userId });
    if (user.status == 204) return { status: 200, message: "The user to search does not exist" };
}

const validateUPDATEPost = async ({ userId, title, body }) => {
    if (typeof userId !== "number" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    if (typeof body !== "string" || body === undefined) return { status: 406, message: "The body data is not arriving" };
    let user = await getUser({ userId });
    if (user.status == 204) return { status: 200, message: "The user to search does not exist" };
}




































// import { getUser } from "./users";

// //GET one
// export const getAllPostone = async (arg) => {
//     let val = await validateAddPost(arg);
//     if (val) return val;
//     let res = await fetch(`https://jsonplaceholder.typicode.com/posts${arg.postId}`);
//     if(res.status === 404)return {status: 204, message: 'username does not exist'}
//     let data = await res.json();
//     return data;
// }

// //GET
// export const getAllPost = async (arg) => {
//     let res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//     let data = await res.json();
//     return data;
// }

// //ADD
// export const AddPost = async(arg) => {
//     let val = await validateAddPost(arg);
//     if (val) return val;
//     let config= {
//         method:"POST",
//         headers:{"Content-type":"application/json"},
//         body: JSON.stringify(arg)
//     }
//     let res = await fetch ("https://jsonplaceholder.typicode.com/posts",config)
//     let data = await res.json();
//     return data;
// }

// //VALIDACIONES
// export {getUser} from "./users";
// const validateAddPost = async ({userId,title,body}) => {
//     if (typeof userId !== "number" || userId === undefined) return{ status:406, message:"the user data is not arriving"}
//     if (typeof title !== "string" || title === undefined ) return{ status:406, message:"the title data is not arriving"}
//     if (typeof body !== "string" || title === undefined ) return{ status:406, message:"the body data is not arriving"}
//     let user = await(getUser)({userId});
//     if(user.status == 204) return{status: 200, message: `The user to search does not exist`}
// }