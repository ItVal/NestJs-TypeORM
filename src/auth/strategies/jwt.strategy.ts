import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "src/config/jwt.config";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AuthJwtPayload } from "../types/auth-jwtPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY) 
        private jwtConfiguration: ConfigType<typeof jwtConfig>) {

        if (!jwtConfiguration.secret) {
             throw new NotFoundException("JWT secret is not defined in configuration");
        }
        super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: jwtConfiguration.secret,
        });

    }

    async validate(payload: AuthJwtPayload) {
        return {id:payload.sub};
    }
}