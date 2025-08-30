export const config = {
    runtime: 'edge',
}

export default async function handler(req: Request) {
    const url = new URL(req.url)
    const userName = url.searchParams.get('userName')
    if (!userName) {
        return new Response(JSON.stringify({ error: 'userName required' }), {
            status: 400,
        })
    }

    const sort = url.searchParams.get('sort')
    const per_page = url.searchParams.get('per_page')

    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN!
    const response = await fetch(
        `https://api.github.com/users/${userName}/repos?sort=${sort}&per_page=${per_page}`,
        {
            headers: {
                Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        }
    )

    return new Response(response.body, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
    })
}
