import { getAllAlbums } from "./albums.js";
import { validateGetUser, getUser } from './users.js';

//GET one
export const getOnePhotos = async (arg) => {
    let val = await validateGetUser(arg);
    if (val) return val;
    let user = await getUser(arg);
    if (user.status === 204) return user;
    let res = await fetch(`https://jsonplaceholder.typicode.com/photos/${arg.userId}`);
    if (res.status === 404) return { status: 204, message: 'post does not exist' };
    let data = await res.json();
    return data;
}

//GET all
export const getAllPhotos = async () => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    let data = await res.json();
    return data;
}

//ADD
export const AddPhotos = async(arg) => {
    let val = await validateAddPhotos(arg);
    if (val) return val;
    let config= {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch ("http://172.16.101.146:5803/photos", config);
    let data = await res.json();
    return data;
}

//UPDATE (PUT)
export const UPDATEPhoto = async(photoId, arg) => {
    let val = await validateUPDATEPhotos(arg);
    if (val) return val;
    let config = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5803/photos/${photoId}`, config);
    let data = await res.json();
    return data;
}

//VALIDACIONES
const validateAddPhotos = async ({ albumId, title, url, thumbnailUrl }) => {
    if (typeof albumId !== "number" || albumId === undefined) return { status: 406, message: "The album data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    if (typeof url !== "string" || url === undefined) return { status: 406, message: "The URL data is not arriving" };
    if (typeof thumbnailUrl !== "string" || thumbnailUrl === undefined) return { status: 406, message: "The thumbnail URL data is not arriving" };
    let album = await getAllAlbums();
    if (!album.some(a => a.id === albumId)) return { status: 204, message: "The album to search does not exist" };
}

const validateUPDATEPhotos = async ({ albumId, title, url, thumbnailUrl }) => {
    if (typeof albumId !== "number" || albumId === undefined) return { status: 406, message: "The album data is not arriving" };
    if (typeof title !== "string" || title === undefined) return { status: 406, message: "The title data is not arriving" };
    if (typeof url !== "string" || url === undefined) return { status: 406, message: "The URL data is not arriving" };
    if (typeof thumbnailUrl !== "string" || thumbnailUrl === undefined) return { status: 406, message: "The thumbnail URL data is not arriving" };
    let album = await getAllAlbums();
    if (!album.some(a => a.id === albumId)) return { status: 204, message: "The album to search does not exist" };
}

const validateDeletePothos = async ({id}) => {
    if (typeof id !== "string"|| id === undefined) return { status: 406, message: "The photo id does not arriving "}
}


//DELETE
export const deleteAlbum = async (arg) => {
    let val = await validateDeletePothos(arg);
    if (val) return val;
    let config = {
        method:"DELETE",
        headers:{"Content-type":"application/json"},
    }
    let res = await fetch(`http://172.16.101.146:5803/photos/${arg.id}`, config);
    if (res.status === 404) return { status: 204, message: `the photo you want to delete is not register in database` };
    let data = await res.json();
    data.status = 200 
    data.message=" The photo was deldete from database"
    return data;
}















































// import { getAllAlbums } from "./albums.js";
// import { validateGetUser, getUser } from './users.js';

// //GET one
// export const getOnePhotos = async (arg) => {
//     let val = await validateGetUser(arg);
//     if (val) return val;
//     let user = await getUser(arg);
//     if (user.status === 204) return user;
//     let res = await fetch(`https://jsonplaceholder.typicode.com/photos/${arg.userId}`);
//     if (res.status === 404) return { status: 204, message: 'post does not exist' }
//     let data = await res.json();
//     return data;

// }

// //GET
// export const getAllPhotos = async (arg) => {
//     let res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
//     let data = await res.json();
//     return data;
// }

// //ADD
// export const AddPhotos = async(arg) => {
//     let val = await validateAddPhotos(arg);
//     if (val) return val;
//     let config= {
//         method:"POST",
//         headers:{"Content-type":"application/json"},
//         body: JSON.stringify(arg)
//     }
//     let res = await fetch ("https://jsonplaceholder.typicode.com/photos",config);
//     let data = await res.json();
//     return data;
// }
// //VALIDACIONES
// const validateAddPhotos = async ({albumId,title,url, thumbnailUrl}) => {
//     if (typeof albumId !== "number" || userId === undefined) return{ status:406, message:"the user data is not arriving"}
//     if (typeof title !== "string" || title === undefined ) return{ status:406, message:"the title data is not arriving"}
//     if (typeof url !== "string" || title === undefined ) return{ status:406, message:"the body data is not arriving"}
//     if (typeof thumbnailUrl !== "string" || title === undefined ) return{ status:406, message:"the body data is not arriving"}
//     let user = await(getUser)({userId});
//     if(user.status == 204) return{status: 200, message: `The user to search does not exist`}
// }

















// //get one
// export const getAllPhotosone = async (arg) => {
//     let val = await validateGetPhotos(arg);
//     if (val) return val;
//     let res = await fetch(`https://jsonplaceholder.typicode.com/photos/${arg.userId}`)
//     if(res.status === 404)return {status: 204, message: 'username does not exist'}
//     let data = await res.json();
//     return data;
// }
//get all