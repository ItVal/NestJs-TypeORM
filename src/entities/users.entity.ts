import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {v4 as uuidv4} from 'uuid';
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    age: number;
    @Column()
    address: string;
    @Column()
    phone: string;
}