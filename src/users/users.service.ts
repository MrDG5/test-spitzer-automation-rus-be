import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(uuid: string) {
    const user = await this.usersRepository.findOneBy({ id: uuid });

    if (!user) {
      throw new HttpException(
        {
          message: 'There is no user in DB with this uuid',
          error: 'Missing data error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async findOneByEmail(email: string, withoutException = false) {
    const user = await this.usersRepository.findOneBy({ email: email });

    if (!withoutException && !user) {
      throw new HttpException(
        {
          message: 'There is no user in DB with this email',
          error: 'Missing data error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async create(newUser: CreateUserDto) {
    const isExist = await this.usersRepository.findOneBy({
      email: newUser.email,
    });

    if (isExist) {
      throw new HttpException(
        {
          message: 'User with such email already exists',
          error: 'Uniqueness violation',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usersRepository.save({
      ...newUser,
      id: uuid.v4(),
      password: await bcrypt.hash(newUser.password, 10),
    });
  }

  async edit(userUuid: string, filedsToEdit: EditUserDto) {
    const userToEdit = await this.findOne(userUuid);

    const updatedUser = { ...userToEdit, ...filedsToEdit };

    if (JSON.stringify(userToEdit) === JSON.stringify(updatedUser))
      return userToEdit;

    return this.usersRepository.save(updatedUser);
  }

  remove(userUuid: string) {
    return this.usersRepository.delete({ id: userUuid });
  }
}
