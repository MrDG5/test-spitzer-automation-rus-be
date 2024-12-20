import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ default: 'Vasia' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'vasia.pupkin@automation.rus' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsNotIn([0], { message: 'Amount must not be equal to zero' })
  amount: number;
}
