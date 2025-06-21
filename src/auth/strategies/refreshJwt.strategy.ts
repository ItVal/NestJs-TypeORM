import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import refreshJwtConfig from "src/config/refreshjwt.config";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(
        @Inject(refreshJwtConfig.KEY) 
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService) {

        if (!refreshJwtConfiguration.secret) {
             throw new NotFoundException("JWT secret is not defined in configuration");
        }
        super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: refreshJwtConfiguration.secret,
              passReqToCallback: true,
        });

    }

    async validate(req:Request, payload: AuthJwtPayload) {
        const authHeader = req.get('authorization');
        const refreshToken = authHeader ? authHeader.replace("Bearer ", "").trim() : null;
        const userId = payload.sub;
        if (!refreshToken) {
            throw new NotFoundException("Refresh token not found in authorization header");
        }
        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}

