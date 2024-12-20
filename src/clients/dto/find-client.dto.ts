import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class FindClientDto {
  @ApiProperty({
    description: 'To specify the uuid of a client',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: 'To specify the email of a client',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
