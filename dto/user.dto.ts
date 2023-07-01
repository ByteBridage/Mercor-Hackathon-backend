import { User } from "@prisma/client";

export interface CreateUserDTO {
    username: string;
    password: string;
    email: string;

    first_name: string;
    last_name: string;

    address?: string;
    pincode?: string;
    student?: Boolean;
    organization?: string;

    age?: Number
}

export interface ExportUserInfoDTO {
    username: string;
    email: string;

    first_name: string;
    last_name: string;

    age?: Number
}


export function mapExportUserDTO(element: User): ExportUserInfoDTO {
    return {...element}
}

