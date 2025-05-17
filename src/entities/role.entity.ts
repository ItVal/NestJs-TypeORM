import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

export class Role {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    designation: string;

    @OneToMany(() => User, (user) => user.role)
    user: User;
    
}
