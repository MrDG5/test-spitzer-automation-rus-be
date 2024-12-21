import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ClientUuidDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
