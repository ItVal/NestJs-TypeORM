import { UserProfiles } from "src/entities/userProfiles.entity";
import { setSeederFactory } from "typeorm-extension";


export const userProfiles = setSeederFactory(UserProfiles, (faker) => {
    const userProfiles = new UserProfiles();
    userProfiles.fullName = faker.name.fullName();
    userProfiles.phone = faker.phone.number();
    userProfiles.country = faker.address.country();
    userProfiles.avatarProfile = faker.image.avatar();
    userProfiles.bio = faker.lorem.paragraph();

    return userProfiles;
})