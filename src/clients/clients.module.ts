import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from 'src/db/entities/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
