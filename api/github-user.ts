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

    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN!
    const response = await fetch(`https://api.github.com/users/${userName}`, {
        headers: {
            Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })

    return new Response(response.body, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
    })
}
