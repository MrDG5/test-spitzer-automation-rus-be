import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsNotIn([0], { message: 'Amount must not be equal to zero' })
  amount?: number;
}
