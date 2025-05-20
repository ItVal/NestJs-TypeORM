import { Role } from "src/entities/users.entity";
import { setSeederFactory } from "typeorm-extension";


export  const roleFactory = setSeederFactory(Role, (faker) => {
    const role = new Role();
    role.designation = faker.helpers.arrayElement(["admin", "user", "superAdmin"]);
    
    return role;
}
)