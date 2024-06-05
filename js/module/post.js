import { getUser } from "./users";

export {getUser} from "./users";
const validateAddPost = async ({userId,title,body}) => {
    if (typeof userId !== "number" || userId === undefined) return{ status:406, message:"the user data is not arriving"}
    if (typeof title !== "string" || title === undefined ) return{ status:406, message:"the title data is not arriving"}
    if (typeof body !== "string" || title === undefined ) return{ status:406, message:"the body data is not arriving"}
    let user = await(getUser)({userId});
    if(user.status == 204) return{status: 200, message: `The user to search does not exist`}
}
export const AddPost = async(arg) => {
    let val = await validateAddPost(arg);
    if (val) return val;
    let config= {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(arg)
    }
    let res = await fetch ("https://jsonplaceholder.typicode.com/posts",config)
    let data = await res.json();
    return data;
}
