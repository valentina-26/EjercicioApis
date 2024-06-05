const validateGetUser= async({userId})=> {
    if (typeof userId !== "number" || userId === undefined) return{ status:406, message:"the user data is not arriving"}
}

export const getUser =async (arg)=>{
    let val = await validateGetUser(arg);
    if (val) return val;
    let res = await fetch(`https://jsonplaceholder.typicode.com/users/${arg.userId}`)
    if(res.status === 404)return {status: 204, message: 'username does not exist'}
    let data = await res.json();
    return data;
}
