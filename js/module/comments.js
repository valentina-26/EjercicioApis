import { getAllPostone } from "./post.js";

//GET
export const GetAllComments = async () => {
    let res = await fetch ("https://jsonplaceholder.typicode.com/comments");
    let data = await res.json();
    return data;
}

//ADD
export const AddComments = async(arg) => {
    let val = await validateAddComments(arg);
    if (val) return val;
    let config = {
        method:"POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(arg)
    }

    let res = await fetch ("https://jsonplaceholder.typicode.com/comments",config)
    let data = await res.json()
    return data;
}

//VALIDACIONES
export {getAllPostone} from "./post.js";
const validateAddComments = async ({postId,name,email,body, }) => {
   // if (typeof postId !== "number" || postId === undefined) return{status:406, message: "The postId data is not arriving"}
    if(typeof name !== "string" || name === undefined ) return{status:406, message: "The name data is not arriving"}
    if(typeof email !== "string" || email === undefined ) return {status:406, message: "The Email data is not arriving"}
    if (typeof body !== "string" || body === undefined) return {status:406, message: "The body data is not arriving"}
    let id = await(getAllPostone)({postId});
    if(user.status == 204) return{status: 200, message: `The postId to search does not exist`}
}
