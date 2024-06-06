import { getUser } from "./users.js";

//GET
export const getAllAlbums = async()=>{
    let res = await fetch("https://jsonplaceholder.typicode.com/albums");
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

    let res = await fetch("https://jsonplaceholder.typicode.com/albums", config);
    let data = await res.json();
    return data;
}

//UPDATE (PUT)
export const updateAlbum = async(albumId, arg)=>{
    let val = await validateUPDATEAlbum(arg);
    if (val) return val;
    let config= {
        method:"PUT",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(arg)
    }

    let res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, config);
    let data = await res.json();
    return data;
}

//VALIDACIONES
const validateAddAlbum = async({userId, title})=> {
    if (typeof userId !== "number" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    let user = await getUser({ userId });
    if (user.status == 204) return { status: 200, message: "The user to search does not exist" };
}

const validateUPDATEAlbum = async({userId, title})=> {
    if (typeof userId !== "number" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    let user = await getUser({ userId });
    if (user.status == 204) return { status: 200, message: "The user to search does not exist" };
}






























// import { getUser } from "./users.js";

// //GET
// export const getAllAlbums = async()=>{
//     let res = await fetch("https://jsonplaceholder.typicode.com/albums");
//     let data = await res.json();
//     return data;
// }

// //ADD
// export const AddAlbum = async(arg)=>{
//     let val = await validateAddAlbum(arg);
//     if (val) return val;
//     let config= {
//         method:"POST",
//         headers:{"Content-type":"application/json"},
//         body: JSON.stringify(arg)
//     }

//     let res = await fetch ("https://jsonplaceholder.typicode.com/albums",config)
//     let data = await res.json();
//     return data;
// }

// //VALIDACIONES
// const validateAddAlbum = async({userId,title})=> {
//     if (typeof userId !== "number" || userId === undefined) return{ status:406, message:"the user data is not arriving"}
//     if (typeof title !== "string" || title === undefined ) return{ status:406, message:"the title data is not arriving"}
//     let user = await getUser ({userId});
//     if (user.status == 204) return {status: 200,message:'The user to search does not exist'}
// }

