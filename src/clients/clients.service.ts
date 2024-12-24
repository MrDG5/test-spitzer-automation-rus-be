import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsEntity } from 'src/db/entities/clients.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientsRepository: Repository<ClientsEntity>,
  ) {}

  findAll() {
    return this.clientsRepository.find();
  }

  findOne(clientId: string) {
    return this.clientsRepository.findBy({ id: clientId });
  }

  findOneByEmail(email: string) {
    return this.clientsRepository.findBy({ email: email });
  }

  async create(createClientDto: CreateClientDto) {
    const isExist = await this.findOneByEmail(createClientDto.email);

    if (isExist.length) {
      throw new HttpException(
        {
          message: 'A client with this email already exists',
          error: 'Uniqueness violation',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.clientsRepository.save({
      ...createClientDto,
      id: uuid.v4(),
    });
  }

  async update(clientId: string, newClientParams: UpdateClientDto) {
    const existClient = await this.clientsRepository.findOneBy({
      id: clientId,
    });

    if (!existClient) {
      throw new HttpException(
        {
          message: 'The client with this uuid does not exist',
          error: 'Unfeasible operation',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const editedClient = { ...existClient, ...newClientParams };
    return this.clientsRepository.save(editedClient);
  }

  async remove(clientId: string) {
    const existClient = await this.clientsRepository.findOneBy({
      id: clientId,
    });

    if (!existClient) {
      throw new HttpException(
        {
          message: 'The client with this uuid does not exist',
          error: 'Unfeasible operation',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.clientsRepository.delete(existClient);
  }

  async getAmountSum() {
    return this.clientsRepository.sum('amount').then((res) => ({
      clientAmountSum: res ?? 0,
    }));
  }
}
