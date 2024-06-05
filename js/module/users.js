
//getone
export const getUser = async (arg) => {
    let val = await validateGetUser(arg);
    if (val) return val;
    let res = await fetch(`https://jsonplaceholder.typicode.com/users/${arg.userId}`);
    if(res.status === 404) return { status: 204, message: `Username does not exist` }
    let data = await res.json();
    return data;
};

//GET
export const getAllusers = async()=>{
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
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
    let res = await fetch("https://jsonplaceholder.typicode.com/users", config);
    let data = await res.json();
    return data;
};


//validaciones
const validateGetUser = async({userId}) =>{
    if (typeof userId !== "number" || userId === undefined) return { status: 406, message: ` The data ${userId} is not arriving or does not comply with the requiered format` }
}

const validateAddUser = async ({ name, username, email, address, phone, website, company}) => {
    if (typeof name !== "string" || name === undefined) return { status: 406, message: `The data name is not arriving or does not comply with the required format` }
    if (typeof username !== "string" || username === undefined) return { status: 406, message: `The data username is not arriving or does not comply with the required format` }
    if (typeof email !== "string" || email === undefined) return { status: 406, message: `The data email is not arriving or does not comply with the required format` }
    if (typeof address !== "object" || address === undefined) return { status: 406, message: `The data address is not arriving or does not comply with the required format` }
    if (typeof phone !== "string" || phone === undefined) return { status: 406, message: `The data phone is not arriving or does not comply with the required format` }
    if (typeof website !== "string" || website === undefined) return { status: 406, message: `The data website is not arriving or does not comply with the required format` }
    if (typeof company !== "object" || company === undefined) return { status: 406, message: `The data company is not arriving or does not comply with the required format` }
    
}

