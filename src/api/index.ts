import axios from 'axios'

export const config = {
  runtime: 'edge',
}

const http = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
})

http.interceptors.response.use(
    (response) => response.data,
)

export { http }