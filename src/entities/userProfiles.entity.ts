import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity()
export class UserProfiles {
    @PrimaryGeneratedColumn("uuid")
        id: number;
        @Column()
        fullPame: string;

        @Column()
        phone: string;

        @Column()
        country: string;

        @Column()
        avatarProfile: string;
        
        @Column()
        bio: string;

     @OneToOne(() => User, (user) => user.userProfiles)
     @JoinColumn()
     user: User;
    }