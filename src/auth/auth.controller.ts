import { Controller, Post, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { U } from '@faker-js/faker/dist/airline-BUL6NtOJ';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
