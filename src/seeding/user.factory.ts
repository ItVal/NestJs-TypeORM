import { Faker } from "@faker-js/faker";
import { User } from "src/entities/users.entity";
import { setSeederFactory } from "typeorm-extension";



export const UserFactory = setSeederFactory(User, (faker) => {
    const user = new User();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.status = faker.helpers.arrayElement(["active", "inactive"]);


    return user;
})