import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserUuidDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
