import {getAllAlbums,AddAlbum} from "./Module/Albums.js";

console.table(await AddAlbum({userId: 10, title: "HolaMundo"}));