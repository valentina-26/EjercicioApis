import {getAllAlbums,AddAlbum} from "./module/albums.js";

console.table(await AddAlbum({userId: 10, title: "rytyrt"}));