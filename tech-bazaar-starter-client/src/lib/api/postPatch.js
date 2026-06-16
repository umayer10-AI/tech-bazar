const BaseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const getData = async (path, token) => {
  const res = await fetch(`${BaseUrl}${path}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const postPatch = async(data, path, method="POST",token) => {
    const res = await fetch(`${BaseUrl}${path}`,{
        method: method,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json()
    return resData
}