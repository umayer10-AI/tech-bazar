import { getData } from "./postPatch"
import { serverToken } from "./serverToken"

export const sellerProductData = async(page) => {
    if(!page){
        page = 1
    }
    const data = await serverToken()
    return await getData(`/seller/products?page=${page}`,data)
}

export const getAllProduct = async(search) => {
    if(search){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products?search=${search}`)
        return res.json()
    }
    else{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`)
        return res.json()
    }
}