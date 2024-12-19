import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/config/db.config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService<{ db: DatabaseConfig }>,
  ) {}

  createTypeOrmOptions() {
    return {
      type: this.configService.get('db.type', { infer: true }),
      host: this.configService.get('db.host', { infer: true }),
      port: this.configService.get('db.port', { infer: true }),
      username: this.configService.get('db.user', { infer: true }),
      password: this.configService.get('db.password', { infer: true }),
      database: this.configService.get('db.name', { infer: true }),
      synchronize: this.configService.get('db.synchronize', { infer: true }),
      logging: this.configService.get('db.log', { infer: true }),
      extra: {
        max: this.configService.get('db.maxConnections', { infer: true }),
      },
      dropSchema: false,
      keepConnectionAlive: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      // cli: {} // TODO: make cli for migrations
      uuidExtension: 'uuid-ossp',
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    } as TypeOrmModuleOptions;
  }
}
