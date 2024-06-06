import {getAllAlbums,AddAlbum,updateAlbum} from "./module/albums.js";
import{getAllPost, AddPost, updatePost} from "./module/post.js";
import{GetAllComments, AddComments, updateComment} from "./module/comments.js";
import {getAllUsers,addUser,updateUser} from "./module/users.js"

console.table(await getAllAlbums({userId: 10, title: "rytyrt"}));
console.table(await getAllPost({id:10, title:"sour", body:"Hola mundo"}))
console.table(await GetAllComments({postId:10, name:"val", email:"maknkandjd", body:"jajhdouhd"}))
console.table(await getAllUsers({
    "name": "valentina",
    "username": "vlentina_c",
    "email": "acastroasn@gmail.com",
    "address": {
      "street": "villas",
      "suite": "Apt. 401",
      "city": "bucara",
      "zipcode": 92998-4785,
      "geo": {
        "lat": -37.7773159,
        "lng": 81.1498226
      }
    },
    "phone": 3248855844,
    "website": "hildegarggd.org",
    "company": {
      "name": "Romaguerrrrrrrrrrrra-Crona",
      "catchPhrase": "Murrrrrrrrrlti-layered client-server neural-net",
      "bs": "harness realrrrrrrrrrrr-time e-markets"
    }
  }))



