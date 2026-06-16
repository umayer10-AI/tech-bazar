// 'user server'

const BaseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const subscription = async(data) => {
    const res = await fetch(`${BaseUrl}/subscription`,{
        method: "POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json()
    return resData
}