import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEmailDto } from './dto/user-email.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUuidDto } from './dto/user-uuid.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    const users = await this.usersService.findAll();

    const userWithoutPass = users.map((user) => {
      const { password, ...userWithoutPass } = user;

      return userWithoutPass;
    });

    return userWithoutPass;
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get user by email' })
  findOne(@Param() params: UserEmailDto) {
    return this.usersService.findOneWithoutPassword({
      email: params.email,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit an existing user' })
  edit(@Param() param: UserUuidDto, @Body() body: EditUserDto) {
    return this.usersService.edit(param.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param() param: UserUuidDto) {
    return this.usersService.remove(param.id);
  }
}
