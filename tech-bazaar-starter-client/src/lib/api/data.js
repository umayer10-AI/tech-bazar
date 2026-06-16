import { getData } from "./postPatch"

export const sellerProductData = async() => {
    return await getData('/seller/products')
}