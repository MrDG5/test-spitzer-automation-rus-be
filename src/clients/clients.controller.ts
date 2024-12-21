import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Query,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientUuidDto } from './dto/client-uuid.dto';

@Controller('users')
@ApiTags('Users')
export class ClientsController {
  constructor(private readonly usersService: ClientsService) {}

  @Get('amount-sum')
  @ApiOperation({ summary: "Get total amount client's sum" })
  findAmountSum() {
    return this.usersService.getAmountSum();
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  find(@Query() emailOrUuid: FindClientDto) {
    if (emailOrUuid.email)
      return this.usersService.findOneByEmail(emailOrUuid.email);

    if (emailOrUuid.id) return this.usersService.findOne(emailOrUuid.id);

    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.usersService.create(createClientDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an existing client' })
  update(
    @Param() param: ClientUuidDto,
    @Body() newClientParams: UpdateClientDto,
  ) {
    return this.usersService.update(param.id, newClientParams);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client' })
  remove(@Param() param: ClientUuidDto) {
    return this.usersService.remove(param.id);
  }
}
