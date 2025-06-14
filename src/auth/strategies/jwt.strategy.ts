import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "src/config/jwt.config";
import { NotFoundException } from "@nestjs/common";


export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly jwtConfiguration: ConfigType<typeof jwtConfig>) {

        if (!jwtConfiguration.secret) {
             throw new NotFoundException("JWT secret is not defined in configuration");
        }
        super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: jwtConfiguration.secret,
        });

    }

    async validate(payload: any) {
        // You can customize this method to return user data or just the payload
        return payload;
    }
}