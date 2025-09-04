import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { Profile } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  
  @IsNotEmpty()
  @IsEnum(Profile)
  profile: Profile;
}