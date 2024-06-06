import {getAllAlbums,AddAlbum,updateAlbum,deleteAlbum} from "./module/albums.js";
import{getAllPost, AddPost, updatePost} from "./module/post.js";
import{GetAllComments, AddComments, updateComment} from "./module/comments.js";
import {getAllUsers,addUser,updateUser} from "./module/users.js";
import {getAllPhotos,getOnePhotos,AddPhotos,UPDATEPhoto} from "./module/photos.js";

let = opc = null;
do {
  opc = prompt(`
  Select an optio:
  1.Albums
  2.Post
  3.comments
  4.phtos
  5.user
  `,1);


opc = Number (opc);
  if (opc == 1) alert (JSON.stringify(await menuAlbums(),null, 4 ))






let menuAlbums =async () => {
  let menu = prompt(`
   ¿ Album Menu ?
      1. Search All
      2. Add
      3. Delete
      4. Update
      0.Back
  `,1);
}

menu = Number (menu);
if (menu == 1) {
  return await getAllAlbums();
};
if (menu == 2){
  let userId = prompt ("Enter the user id", 10);
  let title = prompt ("Enter the album title","Gallery");
  return await AddAlbum({userId, title});
  
}
if (menu == 3){
  let id = prompt ("Enter the id of the album you want to delete")
  return await deleteAlbum ({id});
}

if (menu == 4){
  let userId = prompt ("Enter the user id", 10);
  let title = prompt ("Enter the title of the album")
  return await updateAlbum (userId, title)
}
