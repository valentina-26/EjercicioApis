import {getAllAlbums,AddAlbum} from "./module/albums.js";
import{getAllPost, AddPost} from "./module/post.js";
import{GetAllComments, AddComments} from "./module/comments.js";

console.table(await AddAlbum({userId: 10, title: "rytyrt"}));
console.table(await AddPost({id:10, title:"sour", body:"Hola mundo"}))
console.table(await AddComments({postId:10, name:"val", email:"maknkandjd", body:"jajhdouhd"}))