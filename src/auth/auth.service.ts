import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import refreshjwtConfig from 'src/config/refreshjwt.config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        @Inject(refreshjwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshjwtConfig> // Injecting JWT configuration    
    ) {}

    // Validate user credentials
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException('User not found');
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');
        return {id: user.id}
    }

    //JWT & refresh jwt Authentication
    async login(userId:  number ) {
        const payload: AuthJwtPayload = { sub: userId };
        const token = this.jwtService.sign(payload);
        const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig);
        return { 
            id: userId,
            token, 
            refreshtoken 
        };

    }
}

