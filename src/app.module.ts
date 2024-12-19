import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './db/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      envFilePath: '.env',
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      dataSourceFactory: async (option: DataSourceOptions) => {
        return new DataSource(option).initialize();
      },
    }),
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
