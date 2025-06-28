import { SetMetadata } from "@nestjs/common";
import { Roles } from "../enums/role.enum";


export const ROLES_KEY = "roles";
export const Roless = (...roles: [ Roles, ...Roles[]]) => SetMetadata(ROLES_KEY, roles);