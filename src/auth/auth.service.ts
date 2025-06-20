import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import refreshjwtConfig from 'src/config/refreshjwt.config';
import * as argon2 from 'argon2';

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

    //generate JWT and refresh token
    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig),
        ]);
        return {accessToken, refreshToken};
    }

    //login user and return JWT and refresh token
    async login(userId:  number ) {
        //const payload: AuthJwtPayload = { sub: userId };
       // const token = this.jwtService.sign(payload);
       // const refreshtoken = this.jwtService.sign(payload, this.refreshTokenConfig);
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        // Store hashed refresh token in the database
        await this.userService.updatehashedRefreshToken(userId, hashedRefreshToken);
        return { 
            id: userId,
            accessToken, 
            refreshToken 
        };

    }
    //refresh jwt
    async refreshToken(userId:  number ) {
        const payload: AuthJwtPayload = { sub: userId };
        const token = this.jwtService.sign(payload);
        return { 
            id: userId,
            token
        };

    }

}

