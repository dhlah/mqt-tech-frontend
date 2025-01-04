export async function fetcher(url) {
    const res = await fetch(`${process.env.BASE_URL}${url}`)
    if (res.ok) {
        return res.json()
    }

    return res.status
}