import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRoles, UserRolesType } from 'src/db/entities/users.entity';

export class EditUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(UserRoles, { each: true })
  roles?: UserRolesType[];
}
