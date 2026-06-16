const BaseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const postPatch = async(data, path, method="POST") => {
    const res = await fetch(`${BaseUrl}${path}`,{
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json()
    return resData
}