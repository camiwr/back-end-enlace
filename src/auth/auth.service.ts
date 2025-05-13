import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';



@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    async register(name: string, email: string, password: string) {
  // Verifica se o e-mail pertence ao domínio do IFPI
  if (!email.endsWith('@ifpi.edu.br')) {
    throw new BadRequestException('Email must be from IFPI domain');
  }

  // Verifica se o e-mail já existe no banco de dados
  const existingUser = await this.prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new BadRequestException('Email already in use');

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o usuário no banco de dados
  const user = await this.prisma.user.create({
    data: { name, email, password: hashedPassword, profile: 'USER' },
  });

  return this.generateToken(user);
}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new BadRequestException('Invalid credentials');

    return this.generateToken(user);
  }

  private generateToken(user) {
    const payload = { id: user.id, email: user.email, profile: user.profile };
    return { access_token: this.jwtService.sign(payload) };
  }
}
