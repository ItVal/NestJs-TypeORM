import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import refreshjwtConfig from 'src/config/refreshjwt.config';
import * as argon2 from 'argon2';
import { createUsersDto } from 'src/users/dto/createUsers.dto';

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
    //refresh token rotation
    // This method generates a new access token and refresh token, hashes the new refresh token,
    // and updates the stored hashed refresh token in the database.
    async refreshToken(userId:  number ) {
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

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('User not found or no refresh token stored');
        }
        const isRefreshTokenValid = await argon2.verify(user.hashedRefreshToken, refreshToken);
        if (!isRefreshTokenValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return { id:userId };
    }

        //logout user
    async signOut(userId: number) {
        await this.userService.updatehashedRefreshToken(userId, '');
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const currentUser = {
            id: user.id,
            roles: user.roles,
        };
        return currentUser;

    }

    async validateGoogleUser(googleUser: createUsersDto) {
        const user = await this.userService.findByEmail(googleUser.email);
        if (user)return user;
        return await this.userService.create(googleUser);
    }
}

