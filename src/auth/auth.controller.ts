import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.register(data.name, data.email, data.password);
    response.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'Usuário registrado com sucesso' };
  }

  @Post('login')
  async login(@Body() data, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(data.email, data.password);
    response.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: true, // Use apenas em produção com HTTPS
      sameSite: 'strict',
    });
    return { message: 'Login realizado com sucesso' };
  }
}
