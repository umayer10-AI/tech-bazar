import { postPatch } from "./postPatch"

export const addProduct = async(v) => {
    return await postPatch(v,'/seller/products','POST')
}