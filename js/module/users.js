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

//UPDATE (PUT)
export const updateUser = async (userId, arg) => {
    let val = await validateUPDATEUser(arg);
    if (val) return val;
    let config = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5804/users/${userId}`, config);
    let data = await res.json();
    return data;
};

//validaciones
export const validateGetUser = async ({ userId }) => {
    if (typeof userId !== "string" || userId === undefined) return { status: 406, message: `The data ${userId} is not arriving or does not comply with the required format` };
};

const validateAddUser = async ({ name, username, email, address, phone, website, company }) => {
    if (typeof name !== "string" || name === undefined) return { status: 406, message: `The data name is not arriving or does not comply with the required format` };
    if (typeof username !== "string" || username === undefined) return { status: 406, message: `The data username is not arriving or does not comply with the required format` };
    if (typeof email !== "string" || email === undefined) return { status: 406, message: `The data email is not arriving or does not comply with the required format` };
    if (typeof address !== "object" || address === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` };
    if (typeof phone !== "string" || phone === undefined) return { status: 406, message: `The data phone is not arriving or does not comply with the required format` };
    if (typeof website !== "string" || website === undefined) return { status: 406, message: `The data website is not arriving or does not comply with the required format` };
    if (typeof company !== "object" || company === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` };
};

const validateUPDATEUser = async ({ name, username, email, address, phone, website, company }) => {
    if (typeof name !== "string" || name === undefined) return { status: 406, message: `The data name is not arriving or does not comply with the required format` };
    if (typeof username !== "string" || username === undefined) return { status: 406, message: `The data username is not arriving or does not comply with the required format` };
    if (typeof email !== "string" || email === undefined) return { status: 406, message: `The data email is not arriving or does not comply with the required format` };
    if (typeof address !== "object" || address === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` };
    if (typeof phone !== "number" || phone === undefined) return { status: 406, message: `The data phone is not arriving or does not comply with the required format` };
    if (typeof website !== "string" || website === undefined) return { status: 406, message: `The data website is not arriving or does not comply with the required format` };
    if (typeof company !== "object" || company === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` };
};

const validateDeleteUser = async ({id}) => {
    if (typeof id !== "string"|| id === undefined) return { status: 406, message: "The user id does not arriving "}
}


//DELETE
export const deleteuser = async (arg) => {
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

