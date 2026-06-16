import { postPatch } from "./postPatch"

export const addProduct = async(v,t) => {
    return await postPatch(v,'/seller/products','POST',t)
}