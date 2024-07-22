export interface Login {
    message : string,
    token: string,
    email: string,
    username: string,
    id: string,
    role: 'user' | 'admin'
}
