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

//UPDATE (PUT)
export const updateAlbum = async(albumId, arg)=>{
    let val = await validateUPDATEAlbum(arg);
    if (val) return val;
    let config= {
        method:"PUT",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(arg)
    }

    let res = await fetch(`http://172.16.101.146:5802/albums/${albumId}`, config);
    let data = await res.json();
    return data;
}

//VALIDACIONES
const validateAddAlbum = async({userId, title})=> {
    if (typeof userId !== "string" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    let user = await getUser({ userId });
    if (user.status == 204) return { status: 200, message: "The user to search does not exist" };
}

const validateUPDATEAlbum = async({userId, title})=> {
    if (typeof userId !== "string" || userId === undefined) return { status: 406, message: "The user data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    let user = await getUser({ userId });
    if (user.status == 204) return { status: 200, message: "The album to search does not exist" };
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

