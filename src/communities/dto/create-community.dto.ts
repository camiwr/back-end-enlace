import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;
}