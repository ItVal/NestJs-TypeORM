import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService:UsersService) {}
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new Error('User not found');
        const isPasswordMatch = await compare(password, user.password);
        if (isPasswordMatch) throw new Error('Invalid password');
        return {id: user.id}
    }
}
