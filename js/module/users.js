//getone
export const getUser = async (arg) => {
    let val = await validateGetUser(arg);
    if (val) return val;
    let res = await fetch(`http://172.16.101.146:5804/users/${arg.userId}`);
    if (res.status === 404) return { status: 204, message: `Username does not exist` };
    let data = await res.json();
    return data;
};

//GET
export const getAllUsers = async () => {
    let res = await fetch("http://172.16.101.146:5804/users");
    let data = await res.json();
    return data;
}

//ADD
export const addUser = async (arg) => {
    let val = await validateAddUser(arg);
    if (val) return val;
    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch("http://172.16.101.146:5804/users", config);
    let data = await res.json();
    return data;
};



//validaciones
export const validateGetUser = async ({ userId }) => {
    if (typeof userId !== "string" || userId === undefined) return { status: 406, message: `The data ${userId} is not arriving or does not comply with the required format` };
};

const validateAddUser = async ({ name, username, email, address, phone, website, company}) => {
    if (typeof name !== "string" || name === undefined) return { status: 406, message: `The data name is not arriving or does not comply with the required format` }
    if (typeof username !== "string" || username === undefined) return { status: 406, message: `The data username is not arriving or does not comply with the required format` }
    if (typeof email !== "string" || email === undefined) return { status: 406, message: `The data email is not arriving or does not comply with the required format` }
    if (typeof address !== "object" || address === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof address.street !== "string" || address.street === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof address.suite !== "string" || address.suite === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof address.city !== "string" || address.city === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof address.zipcode !== "string" || address.zipcode === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof address.geo!== "object" || address.geo === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof address.geo.lat!== "string" || address.geo.lat === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof address.geo.lng!== "string" || address.geo.lng === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof phone !== "string" || phone === undefined) return { status: 406, message: `The data phone is not arriving or does not comply with the required format` }
    if (typeof website !== "string" || website === undefined) return { status: 406, message: `The data website is not arriving or does not comply with the required format` }
    if (typeof company !== "object" || company === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
    if (typeof company.name !== "string" || company.name === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
    if (typeof company.catchPhrase !== "string" || company.catchPhrase === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
    if (typeof company.bs!== "string" || company.bs === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
};



const validateDeleteUser = async ({id}) => {
    if (typeof id !== "string"|| id === undefined) return { status: 406, message: "The user id does not arriving "}
}


//DELETE
export const deleteUser = async (arg) => {
    let val = await validateDeleteUser(arg);
    if (val) return val;
    let config = {
        method:"DELETE",
        headers:{"Content-type":"application/json"},
    }
    let res = await fetch(`http://172.16.101.146:5804/users/${arg.id}`, config);
    if (res.status === 404) return { status: 204, message: `the user you want to delete is not register in database` };
    let data = await res.json();
    data.status = 200 
    data.message=" The user was deldete from database"
    return data;
}

//UPDATE
export const updateUser = async () => {
    const userId = prompt("Ingrese el ID del usuario que desea modificar.");

    const existe = async () => {
        let val = await validateGetUser();
        if (val) return val;
        let res = await fetch(`http://172.16.101.146:5804/users/${userId}`);
        if (res.status === 404) return { status: 204, message: `Username does not exist` };
        let data = await res.json();
        return data;
    };
    const llamar = await existe.json();

    let Opciones;
    let updateUsers;
    let updateAdress;
    let updateGeo;
    let updateCompany

    if (llamar) {
        const option = parseInt(prompt("Opciones disponibles:\n1. name  \n2. username  \n3. email  \n4. address  \n5.  phone  \n6. website  \n7. company \nIngrese la opción:"));
        Opciones = (option === 1) ? "name" :
                            (option === 2) ? "username" :
                             (option === 3) ? "email" :
                             (option === 4) ? "address" :
                             (option === 5) ? "phone" :
                             (option === 6) ? "website" :
                             (option === 7) ? "company" : null;
    
    }

    if (!Opciones){
        console.log("Opción no válida.");
        return "Opción no válida.";
    }

    if (Opciones = 1 || 2 || 3 || 5 || 6) {
        const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
        updateUsers = { ...llamar, [Opciones]: newValue };
    }

    if (Opciones == 4){
        const optionAdress = parseInt(prompt("Opciones disponibles:\n1. street  \n2. suite  \n3. city  \n4. zipcode  \n5. geo  \nIngrese la opción:"));
        const newValue = prompt(`Ingrese el nuevo valor para ${optionAdress}:`);
        updateAdress = {... llamar, [optionAdress]: newValue };
        if(optionAdress == 5){
            const optionGeo = parseInt(prompt("Opciones disponibles:\n1. lat  \n2. lng \nIngrese la opción:"));
            const newValue = prompt(`Ingrese el nuevo valor para ${optionGeo}:`);
            updateGeo = {... llamar, [optionGeo]: newValue };
        }
    }

    if (Opciones == 7){
        const optionCompany = parseInt(prompt("Opciones disponibles:\n1. name  \n2. catchPhrase  \n3. bs   \nIngrese la opción:"));
        const newValue = prompt(`Ingrese el nuevo valor para ${optionCompany}:`);
        updateCompany= {... llamar, [optionCompany]: newValue };
    }

    console.log(updateUsers)

    // const config = {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updateUsers)
    // };

    // const response = await fetch(`http://172.16.101.146:5803/photos/${userId}`, config);
    // const data = await response.json();

    }























// export const updateUser = async () => {
//     const userId = prompt("Ingrese el ID del usuario que desea modificar.");

//     const existe = await fetch(`http://172.16.101.146:5802/users/${userId}`);
//     const llamar = await existe.json();

//     if (llamar) {
//         const option = parseInt(prompt("Opciones disponibles:\n1. name\n2. username\n3. email\n4. address.street\n5. address.suite\n6. address.city\n7. address.zipcode\n8. geo.lat\n9. geo.lng\n10. phone\n11. website\n12. company.name\n13. company.catchPhrase\n14. company.bs\nIngrese la opción:"));

//         const optionsMap = {
//             1: "name",
//             2: "username",
//             3: "email",
//             4: "address.street",
//             5: "address.suite",
//             6: "address.city",
//             7: "address.zipcode",
//             8: "geo.lat",
//             9: "geo.lng",
//             10: "phone",
//             11: "website",
//             12: "company.name",
//             13: "company.catchPhrase",
//             14: "company.bs"
//         };

//         const field = optionsMap[option];

//         if (!field) {
//             console.log("Opción no válida.");
//             return "Opción no válida.";
//         }

//         const newValue = prompt(`Ingrese el nuevo valor para ${field}:`);

//         const updatedUser = {};
//         const fieldParts = field.split(".");
//         if (fieldParts.length === 1) {
//             updatedUser[fieldParts[0]] = newValue;
//         } else if (fieldParts.length === 2) {
//             updatedUser[fieldParts[0]] = { [fieldParts[1]]: newValue };
//         } else if (fieldParts.length === 3) {
//             updatedUser[fieldParts[0]] = { [fieldParts[1]]: { [fieldParts[2]]: newValue } };
//         }

//         const config = {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatedUser)
//         };

//         const response = await fetch(`http://172.16.101.146:5802/users/${userId}`, config);
//         const data = await response.json();

//         console.log("Usuario actualizado con éxito:", data);

//         return data;
//     } else {
//         console.log("El id no existe o es nulo.");
//         return "El id no existe o es nulo.";
//     }
// };


// //UPDATE (PUT)
// export const updateUser = async (userId, arg) => {
//     let val = await validateUPDATEUser(arg);
//     if (val) return val;
//     let config = {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(arg)
//     };
//     let res = await fetch(`http://172.16.101.146:5804/users/${userId}`, config);
//     let data = await res.json();
//     return data;
// };

// const validateUPDATEUser = async ({ name, username, email, address, phone, website, company }) => {
//     if (typeof name !== "string" || name === undefined) return { status: 406, message: `The data name is not arriving or does not comply with the required format` }
//     if (typeof username !== "string" || username === undefined) return { status: 406, message: `The data username is not arriving or does not comply with the required format` }
//     if (typeof email !== "string" || email === undefined) return { status: 406, message: `The data email is not arriving or does not comply with the required format` }
//     if (typeof address !== "object" || address === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof address.street !== "string" || address.street === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof address.suite !== "string" || address.suite === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof address.city !== "string" || address.city === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof address.zipcode !== "string" || address.zipcode === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof address.geo!== "object" || address.geo === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof address.geo.lat!== "string" || address.geo.lat === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof address.geo.lng!== "string" || address.geo.lng === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof phone !== "string" || phone === undefined) return { status: 406, message: `The data phone is not arriving or does not comply with the required format` }
//     if (typeof website !== "string" || website === undefined) return { status: 406, message: `The data website is not arriving or does not comply with the required format` }
//     if (typeof company !== "object" || company === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
//     if (typeof company.name !== "string" || company.name === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
//     if (typeof company.catchPhrase !== "string" || company.catchPhrase === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
//     if (typeof company.bs!== "string" || company.bs === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
// };




































// //getone
// export const getUser = async (arg) => {
//     let val = await validateGetUser(arg);
//     if (val) return val;
//     let res = await fetch(`https://jsonplaceholder.typicode.com/users/${arg.userId}`);
//     if(res.status === 404) return { status: 204, message: `Username does not exist` }
//     let data = await res.json();
//     return data;
// };

// //GET
// export const getAllusers = async()=>{
//     let res = await fetch("https://jsonplaceholder.typicode.com/users");
//     let data = await res.json();
//     return data;
// }

// //ADD
// export const addUser = async (arg) => {
//     let val = await validateAddUser(arg);
//     if (val) return val;
//     let config = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(arg)
//     };
//     let res = await fetch("https://jsonplaceholder.typicode.com/users", config);
//     let data = await res.json();
//     return data;
// };


// //validaciones
// const validateGetUser = async({userId}) =>{
//     if (typeof userId !== "number" || userId === undefined) return { status: 406, message: ` The data ${userId} is not arriving or does not comply with the requiered format` }
// }

// const validateAddUser = async ({ name, username, email, address, phone, website, company}) => {
//     if (typeof name !== "string" || name === undefined) return { status: 406, message: `The data name is not arriving or does not comply with the required format` }
//     if (typeof username !== "string" || username === undefined) return { status: 406, message: `The data username is not arriving or does not comply with the required format` }
//     if (typeof email !== "string" || email === undefined) return { status: 406, message: `The data email is not arriving or does not comply with the required format` }
//     if (typeof address !== "object" || address === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
//     if (typeof phone !== "string" || phone === undefined) return { status: 406, message: `The data phone is not arriving or does not comply with the required format` }
//     if (typeof website !== "string" || website === undefined) return { status: 406, message: `The data website is not arriving or does not comply with the required format` }
//     if (typeof company !== "object" || company === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
    
// }

