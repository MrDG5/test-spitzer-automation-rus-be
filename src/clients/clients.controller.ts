import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class ClientsController {
  constructor(private readonly usersService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create() {
    return this.usersService.create();
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit an existing user' })
  update(@Param('id') id: string) {
    return this.usersService.update(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
