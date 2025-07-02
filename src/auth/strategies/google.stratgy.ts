import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import googleConfig from 'src/config/google.oauth.config';
import googleOauthConfig from 'src/config/google.oauth.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY) // Injecting the Google OAuth configuration
    private readonly googleConfiguration: ConfigType<typeof googleOauthConfig>, // Using the injected configuration
    private readonly authService: AuthService, // Assuming you have an AuthService to handle user validation
  ) {
    //const config = googleConfig();

    super({
      clientID: googleConfiguration.clientID ?? '',
      clientSecret: googleConfiguration.clientSecret ?? '',
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['email', 'profile'],
      passReqToCallback: true, // Permet de passer req en premier paramètre
    });
  }

  // ✅ callback avec req en premier paramètre
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ){
    console.log({profile});
    const user = await this.authService.validateGoogleUser({
        email: profile.emails[0].value,
        password: '',
        status: 'active' // or another appropriate status value
    });
    done(null, user);
  }
}
