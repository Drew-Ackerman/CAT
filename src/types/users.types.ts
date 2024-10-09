
export interface IUser {
    id: string,
    name: string,
    email: string,
    image: string,
    role: "admin" | "user",
}