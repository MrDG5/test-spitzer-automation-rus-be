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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpErrorFilter } from './common/http-error.filter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import secretConfig from './config/secret.config';
import { MigrationService } from './db/migration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : undefined, // railway.NODE_ENV = "production"
      isGlobal: true,
      load: [appConfig, dbConfig, secretConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      dataSourceFactory: async (option: DataSourceOptions) => {
        return new DataSource(option).initialize();
      },
    }),
    AuthModule,
    ClientsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    MigrationService,
  ],
})
export class AppModule {}
