import { getAllAlbums, AddAlbum, updateAlbum, deleteAlbum } from "./module/albums.js";
import { getAllPost, AddPost, updatePost, deletePost } from "./module/post.js";
import { GetAllComments, AddComments, updateComment, deleteComments } from "./module/comments.js";
import { getAllUsers, addUser, updateUser, deleteUser } from "./module/users.js";
import { getAllPhotos, AddPhotos, UPDATEPhoto, deletePhotos } from "./module/photos.js";


//MENU PRINCIPAL
let opc = null;
do {
    opc = Number(prompt(`
    Select an option:
    1. Albums
    2. Posts
    3. Comments
    4. Photos
    5. Users
    `, 1));

    if (opc == 1) alert(JSON.stringify(await menuAlbums(), null, 4));
    if (opc == 2) alert(JSON.stringify(await menuPosts(), null, 4));
    if (opc == 3) alert(JSON.stringify(await menuComments(), null, 4));
    if (opc == 4) alert(JSON.stringify(await menuPhotos(), null, 4));
    if (opc == 5) alert(JSON.stringify(await menuUsers(), null, 4));
} while (opc);

//ALBUMS MENU
async function menuAlbums() {
    let menu = Number(prompt(`
        Album Menu:
        1. View All
        2. Add
        3. Delete
        4. Update

    `, 1));

    if (menu == 1) {
        return await getAllAlbums();
    }
    if (menu == 2) {
        let userId = prompt("Enter the user ID", 10);
        let title = prompt("Enter the album title", "Gallery");
        return await AddAlbum({ userId, title });
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the album you want to delete");
        return await deleteAlbum({ id });
    }
    if (menu == 4) {
        return await updateAlbum();
    }
    
    
}


//POSTS MENU
async function menuPosts() {
    let menu = Number(prompt(`
        Post Menu:
        1. View All
        2. Add
        3. Delete
        4. Update
        0. Back
    `, 1));

    if (menu == 1) {
        return await getAllPost();
    }
    if (menu == 2) {
        let userId = prompt("Enter the user ID", 10);
        let title = prompt("Enter the post title", "Gallery");
        let body = prompt("Enter the body of the post", "Sample text");
        return await AddPost({ userId, title, body });
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the post you want to delete");
        return await deletePost({ id });
    }
    if (menu == 4) {
        return await updatePost();
    }
}


//COMENTS MENU
async function menuComments() {
    let menu = Number(prompt(`
        Comments Menu:
        1. View All
        2. Add
        3. Delete
        4. Update
        0. Back
    `, 1));

    if (menu == 1) {
        return await GetAllComments();
    }
    if (menu == 2) {
        let postId = prompt("Enter the post ID", 10);
        let name = prompt("Enter the comment name", "Hello");
        let email = prompt("Enter the comment email", "example@example.com");
        let body = prompt("Enter the comment body", "Comment text");
        return await AddComments({ postId, name, email, body });
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the comment you want to delete");
        return await deleteComments({ id });
    }
    if (menu == 4) {
        return await updateComment();
    }
}


//PHOTOS MENU
async function menuPhotos() {
    let menu = Number(prompt(`
        Photos Menu:
        1. View All
        2. Add
        3. Delete
        4. Update
        0. Back
    `, 1));

    if (menu == 1) {
        return await getAllPhotos();
    }
    if (menu == 2) {
        let albumId = (prompt("Enter the album ID", 15));
        let title = prompt("Enter the photo title", "Gallery");
        let url = prompt("Enter the photo URL", "httpexample.com/photo.jpg");
        let thumbnailUrl = prompt("Enter the photo thumbnail URL", "httpexample.com/thumbnail.jpg");
        return await AddPhotos({ albumId, title, url, thumbnailUrl });
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the photo you want to delete");
        return await deletePhotos({ id });
    }
    if (menu == 4) {
        return await UPDATEPhoto();
    }
}


//USERS MENU
async function menuUsers() {
    let menu = Number(prompt(`
        Users Menu:
        1. View All
        2. Add
        3. Delete
        4. Update
        0. Back
    `, 1));

    if (menu == 1) {
        return await getAllUsers();
    }
    if (menu == 2) {
        let name = prompt("Enter the user name", "John Doe");
        let username = prompt("Enter the username", "johndoe");
        let email = prompt("Enter the email", "john@example.com");
        let street = prompt("Enter the street", "Victor Plains");
        let suite = prompt("Enter the suite", "Suite 879");
        let city = prompt("Enter the city", "Wisokyburgh");
        let zipcode = prompt("Enter the zipcode", "90566-7771");
        let lat = prompt("Enter the latitude", "-43.9509");
        let lng = prompt("Enter the longitude", "-34.4618");
        let phone = prompt("Enter the phone number", "1234567890");
        let website = prompt("Enter the website", "httpexample.com");
        let companyName = prompt("Enter the company name", "Example Inc.");
        let catchPhrase = prompt("Enter the company catch phrase", "Proactive didactic contingency");
        let bs = prompt("Enter the company bs", "synergize scalable supply-chains");
        

        let address = {
            street,
            suite,
            city,
            zipcode,
            geo: {
                lat,
                lng
            }
        };
    

        let company = {
            name: companyName,
            catchPhrase,
            bs
        };
    
        return await addUser({ name, username, email, address, phone, website, company });
    }
    
    if (menu == 3) {
        let id = prompt("Enter the ID of the user you want to delete");
        return await deleteUser({ id });
    }
    if (menu == 4) {
        return await updateUser();
    }
}




