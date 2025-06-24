import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, BeforeInsert} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserProfiles } from "./userProfiles.entity";
import { Role } from "./role.entity";
import { Roles } from "src/auth/enums/role.enum";
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    hashedRefreshToken: string;

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    roles:Role;

    @Column()
    status: string;

    @OneToOne(() => UserProfiles, (userProfiles) => userProfiles.user, { cascade: true })
    userProfiles: UserProfiles;

    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn() 
    role: Role;

    @BeforeInsert()
     async hashPassword() {
       this.password = await bcrypt.hash(this.password, 10);
    }
  
}

export { Role };
