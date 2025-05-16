import { Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { UserProfiles } from "./userProfiles.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    status: string;

    @OneToOne(() => UserProfiles, (userProfiles) => userProfiles.user, { cascade: true })
    userProfiles: UserProfiles;
  
}