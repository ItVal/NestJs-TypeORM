import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { UserProfiles } from "../entities/userProfiles.entity";
import { User } from "../entities/users.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";


export class InitialSeed implements Seeder {
    async run(dataSource: DataSource) {
        const roleRepository = dataSource.getRepository(Role);
        const userRepository = dataSource.getRepository(User);
        const userProfileRepository = dataSource.getRepository(UserProfiles);

 //create 3 roles
    const roles: Role[] = [];
       for (let i = 0; i < 3; i++) {
     const role = roleRepository.create({
      designation:  faker.helpers.arrayElement(["admin", "user", "superAdmin"]),
    });
    roles.push(await roleRepository.save(role));
  }

  //create 10 users
    for (let i = 0; i < 10; i++) {
        const users = userRepository.create({
            email: faker.internet.email(),
            password: faker.internet.password(),
            status: faker.helpers.arrayElement(["active", "inactive"]),
            // Assuming you have a role with id 1 to 3
            role: roles[Math.floor(Math.random() * roles.length)],
        });
        await userRepository.save(users);
    }

    //create 10 user profiles
    const users: User[] = await userRepository.find();
    if (users.length === 0) {
         throw new NotFoundException('No users found');
    }
   for (const user of users) {
  const profile = userProfileRepository.create({
    fullName: faker.name.fullName(),
    phone: faker.phone.number(),
    country: faker.address.country(),
    avatarProfile: faker.image.avatar(),
    bio: faker.lorem.paragraph(),
    user: user,
  });

  await userProfileRepository.save(profile);
}


} }