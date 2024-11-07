export interface IUser {
  id: number;
  name: string;
  email: string;
  image: string | null;
  role: "admin" | "user";
}

export enum Roles {
  Admin = "admin",
  User = "user"
}