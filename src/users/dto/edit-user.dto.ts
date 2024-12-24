import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles, UserRolesType } from 'src/db/entities/users.entity';

export class EditUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(UserRoles, { each: true })
  roles: UserRolesType[];
}
