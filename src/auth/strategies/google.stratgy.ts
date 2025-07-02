import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import googleConfig from 'src/config/google.oauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const config = googleConfig();

    super({
      clientID: config.clientID ?? '',
      clientSecret: config.clientSecret ?? '',
      callbackURL: config.callbackUrl,
      scope: ['email', 'profile'],
      passReqToCallback: true, // Permet de passer req en premier paramètre
    });
  }

  // ✅ avec req en premier paramètre
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ){
    console.log({profile});
  }
}
