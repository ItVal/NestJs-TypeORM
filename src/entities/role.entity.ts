import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";
@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    
    @Column()
    designation: string;

    @OneToMany(() => User, (user) => user.role)
    user: User;
    
}
