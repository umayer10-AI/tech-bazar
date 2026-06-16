import { getData } from "./postPatch"
import { serverToken } from "./serverToken"

export const sellerProductData = async(page) => {
    if(!page){
        page = 1
    }
    const data = await serverToken()
    return await getData(`/seller/products?page=${page}`,data)
}