import { postPatch } from "./postPatch"

export const addProduct = async(v,t) => {
    // const token = 
    return await postPatch(v,'/seller/products','POST',t)
}