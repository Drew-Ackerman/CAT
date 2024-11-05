export interface IUser {
  id: number;
  name: string;
  email: string;
  image: string | null;
  role: "admin" | "user" | string,
}

export enum Roles {
  Admin = "admin",
  User = "user"
}