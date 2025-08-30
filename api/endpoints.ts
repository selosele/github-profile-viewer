export const endpoints = {
    user: (userName: string) =>
        import.meta.env.DEV ? `/users/${userName}` : `/github-user`,
    repos: (userName: string) =>
        import.meta.env.DEV
            ? `/users/${userName}/repos`
            : `/github-user-repository`,
}
