import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.DEV ? 'https://api.github.com' : '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export { http }
