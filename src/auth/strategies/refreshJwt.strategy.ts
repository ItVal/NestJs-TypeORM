import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import refreshJwtConfig from "src/config/refreshjwt.config";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AuthJwtPayload } from "../types/auth-jwtPayload";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(
        @Inject(refreshJwtConfig.KEY) 
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>) {

        if (!refreshJwtConfiguration.secret) {
             throw new NotFoundException("JWT secret is not defined in configuration");
        }
        super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: refreshJwtConfiguration.secret,
        });

    }

    async validate(payload: AuthJwtPayload) {
        return { id: payload.sub };
    }
}

