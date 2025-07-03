import { Controller, Post, UseGuards, Request, HttpCode, HttpStatus, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK) 
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user.id);
  }
  
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return await this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async signOut(@Request() req) {
    await this.authService.signOut(req.user.id);
    return { message: 'Successfully logged out' };
  }

@Public()
@UseGuards(GoogleAuthGuard)
@Get('google/login')
googleLogin(){}

@Public()
@UseGuards(GoogleAuthGuard)
@Get('google/callback')
async googleCallback(@Req() req, @Res() res) {
  // This will be called after Google redirects back to your app
  // The user information will be available in req.user
  const response = await this.authService.login(req.user.id);
  res.redirect(`http://localhost:5173?token=${response.accessToken}&refreshToken=${response.refreshToken}`);

}


}
