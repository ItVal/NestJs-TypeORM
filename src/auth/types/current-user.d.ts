import { Roles } from "../enums/role.enum";


export interface CurrentUser {
  id: number;
  roles: Roles;
}
