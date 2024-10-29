import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { Roles } from "~/types";

export async function isAdmin(request: NextRequest){
    return isAuthorized(request, Roles.Admin)
}

export async function isAuthorized(request: NextRequest, role: Roles): Promise<boolean>{
    const token = await getToken({req:request});
    if(token == undefined){
        throw new Error("Cannot get authorization token from request")
    }
    return token.role === role;
}

export async function isNotAuthorized(request: NextRequest, role: Roles){
    return !(await isAuthorized(request, role));
}