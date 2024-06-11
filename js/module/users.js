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
};


// ADD
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
export const validateGetUser = async (arg) => {
    if (!arg || typeof arg.userId !== "string" || arg.userId === undefined) {
        return { status: 406, message: `The data ${arg ? arg.userId : 'undefined'} is not arriving or does not comply with the required format` };
    }
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
        method: "DELETE",
        headers: { "Content-type": "application/json" },
    };
    let res = await fetch(`http://172.16.101.146:5804/users/${arg.id}`, config);
    if (res.status === 404) return { status: 204, message: `the user you want to delete is not register in database` };
    let data = await res.json();
    data.status = 200;
    data.message = "The user was deleted from database";
    return data;
};






//Upadte
export const updateUser = async () => {
    const userId = prompt("Ingrese el ID del usuario que desea modificar.");

    // const existe = async () => {
    //     let val = await validateGetUser();
    //     if (val) return val;
    //     let res = await fetch(`http://172.16.101.146:5804/users/${userId}`);
    //     if (res.status === 404) return { status: 204, message: `Username does not exist` };
    //     let data = await res.json();
    //     return data;
    // };


    const existe = await fetch(`http://172.16.101.146:5804/users/${userId}`);
        const llamar = await existe.json();
        
    let Opciones;
    let updateUsers;
    let updateAdress;
    let updateGeo;
    let updateCompany;

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

    if (!Opciones) {
        console.log("Opción no válida.");
        return "Opción no válida.";
    }

    if (Opciones === "name" || Opciones === "username" || Opciones === "email" || Opciones === "phone" || Opciones === "website") {
        const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
        updateUsers = { ...llamar, [Opciones]: newValue };
    }

    if (Opciones === "address") {
        const optionAddress = parseInt(prompt("Opciones disponibles:\n1. street  \n2. suite  \n3. city  \n4. zipcode  \n5. geo  \nIngrese la opción:"));
        const addressField = (optionAddress === 1) ? "street" :
                             (optionAddress === 2) ? "suite" :
                             (optionAddress === 3) ? "city" :
                             (optionAddress === 4) ? "zipcode" :
                             (optionAddress === 5) ? "geo" : null;

        if (!addressField) {
            console.log("Opción de dirección no válida.");
            return "Opción de dirección no válida.";
        }

        if (addressField !== "geo") {
            const newValue = prompt(`Ingrese el nuevo valor para ${addressField}:`);
            updateAdress = { ...llamar, address: { ...llamar.address, [addressField]: newValue } };
        } else {
            const optionGeo = parseInt(prompt("Opciones disponibles:\n1. lat  \n2. lng \nIngrese la opción:"));
            const geoField = (optionGeo === 1) ? "lat" :
                             (optionGeo === 2) ? "lng" : null;

            if (!geoField) {
                console.log("Opción de geolocalización no válida.");
                return "Opción de geolocalización no válida.";
            }

            const newValue = prompt(`Ingrese el nuevo valor para ${geoField}:`);
            updateGeo = { ...llamar, address: { ...llamar.address, geo: { ...llamar.address.geo, [geoField]: newValue } } };
        }
    }

    if (Opciones === "company") {
        const optionCompany = parseInt(prompt("Opciones disponibles:\n1. name  \n2. catchPhrase  \n3. bs   \nIngrese la opción:"));
        const companyField = (optionCompany === 1) ? "name" :
                             (optionCompany === 2) ? "catchPhrase" :
                             (optionCompany === 3) ? "bs" : null;

        if (!companyField) {
            console.log("Opción de compañía no válida.");
            return "Opción de compañía no válida.";
        }

        const newValue = prompt(`Ingrese el nuevo valor para ${companyField}:`);
        updateCompany = { ...llamar, company: { ...llamar.company, [companyField]: newValue } };
    }

    console.log(userId)

    const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateFields)
            };
        
            const response = await fetch(`http://172.16.101.146:5804/users/${userId}`, config);
            const data = await response.json();
        
            console.log("Actualización completada:", data);

    
    
};



//PATCH
// export const updateUser = async () => {
//     const userId = prompt("Ingrese el ID del usuario que desea modificar.");

//     const existe = async () => {
//         let val = await validateGetUser();
//         if (val) return val;
//         let res = await fetch(`http://172.16.101.146:5804/users/${userId}`);
//         if (res.status === 404) return { status: 204, message: `Username does not exist` };
//         let data = await res.json();
//         return data;
//     };
//     const llamar = await existe();

//     let Opciones;
//     let updateFields = {};

//     if (llamar) {
//         const option = parseInt(prompt("Opciones disponibles:\n1. name  \n2. username  \n3. email  \n4. address  \n5. phone  \n6. website  \n7. company \nIngrese la opción:"));
//         Opciones = (option === 1) ? "name" :
//                             (option === 2) ? "username" :
//                             (option === 3) ? "email" :
//                             (option === 4) ? "address" :
//                             (option === 5) ? "phone" :
//                             (option === 6) ? "website" :
//                             (option === 7) ? "company" : null;
//     }

//     if (!Opciones){
//         console.log("Opción no válida.");
//         return "Opción no válida.";
//     }

//     if (Opciones === "name" || Opciones === "username" || Opciones === "email" || Opciones === "phone" || Opciones === "website") {
//         const newValue = prompt(`Ingrese el nuevo valor para ${Opciones}:`);
//         updateFields[Opciones] = newValue;
//     }

//     if (Opciones === "address") {
//         const optionAddress = parseInt(prompt("Opciones disponibles:\n1. street  \n2. suite  \n3. city  \n4. zipcode  \n5. geo  \nIngrese la opción:"));
//         const addressField = (optionAddress === 1) ? "street" :
//                              (optionAddress === 2) ? "suite" :
//                              (optionAddress === 3) ? "city" :
//                              (optionAddress === 4) ? "zipcode" :
//                              (optionAddress === 5) ? "geo" : null;

//         if (!addressField) {
//             console.log("Opción de dirección no válida.");
//             return "Opción de dirección no válida.";
//         }

//         if (addressField !== "geo") {
//             const newValue = prompt(`Ingrese el nuevo valor para ${addressField}:`);
//             updateFields["address"] = { ...llamar.address, [addressField]: newValue };
//         } else {
//             const optionGeo = parseInt(prompt("Opciones disponibles:\n1. lat  \n2. lng \nIngrese la opción:"));
//             const geoField = (optionGeo === 1) ? "lat" :
//                              (optionGeo === 2) ? "lng" : null;

//             if (!geoField) {
//                 console.log("Opción de geolocalización no válida.");
//                 return "Opción de geolocalización no válida.";
//             }

//             const newValue = prompt(`Ingrese el nuevo valor para ${geoField}:`);
//             updateFields["address"] = {
//                 ...llamar.address,
//                 geo: { ...llamar.address.geo, [geoField]: newValue }
//             };
//         }
//     }

//     if (Opciones === "company") {
//         const optionCompany = parseInt(prompt("Opciones disponibles:\n1. name  \n2. catchPhrase  \n3. bs   \nIngrese la opción:"));
//         const companyField = (optionCompany === 1) ? "name" :
//                              (optionCompany === 2) ? "catchPhrase" :
//                              (optionCompany === 3) ? "bs" : null;

//         if (!companyField) {
//             console.log("Opción de compañía no válida.");
//             return "Opción de compañía no válida.";
//         }

//         const newValue = prompt(`Ingrese el nuevo valor para ${companyField}:`);
//         updateFields["company"] = { ...llamar.company, [companyField]: newValue };
//     }

//     const config = {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updateFields)
//     };

//     const response = await fetch(`http://172.16.101.146:5804/users/${userId}`, config);
//     const data = await response.json();

//     console.log("Actualización completada:", data);
// };