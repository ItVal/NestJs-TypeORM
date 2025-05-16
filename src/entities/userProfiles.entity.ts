import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    user: any;
    }