import { postPatch } from "./postPatch"

export const addProduct = async(v,t) => {
    return await postPatch(v,'/seller/products','POST',t)
}

export const emailVerification = async(email,name) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/send-email?email=${email}&name=${name}`,{
        method: "POST",
        // headers: {
        //     'content-type' : 'application/json'
        // },
        // body:
    })
}