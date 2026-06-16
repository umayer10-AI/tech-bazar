const BaseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const postPatch = async(data, path, method="POST",token) => {
    const res = await fetch(`${BaseUrl}${path}`,{
        method: method,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json()
    return resData
}