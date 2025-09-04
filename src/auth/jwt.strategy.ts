import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      console.log('JWT Strategy - Token extraído do cookie:', token); // <-- LOG AQUI
      return token;
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('JWT Strategy - Payload do token:', payload); // <-- LOG AQUI
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      console.log('JWT Strategy - Usuário não encontrado.');
      return null;
    }

    console.log('JWT Strategy - Usuário validado. userId:', user.id); // <-- LOG AQUI
    return { userId: user.id, email: user.email, profile: user.profile };
  }
}