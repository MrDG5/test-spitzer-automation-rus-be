import { registerAs } from '@nestjs/config';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';
import { LoggerOptions } from 'typeorm';
import { validateConfig } from './validate.config';

export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  synchronize: boolean;
  maxConnections: number;
  log: LoggerOptions;
};

class EnvironmentVariblesValidator {
  @IsString()
  DB_TYPE: string;

  @IsString()
  DB_HOST: string;

  @Type(() => Number)
  @IsInt()
  @Min(1024)
  @Max(49151)
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  DB_SYNCHRONIZE: boolean;

  @Type(() => Number)
  @IsInt()
  DB_MAX_CONNECTIONS: number;
}

export default registerAs<DatabaseConfig>('db', (): DatabaseConfig => {
  const validate = validateConfig(process.env, EnvironmentVariblesValidator);

  return {
    type: validate.DB_TYPE,
    host: validate.DB_HOST,
    port: validate.DB_PORT,
    user: validate.DB_USER,
    password: validate.DB_PASSWORD,
    name: validate.DB_NAME,
    synchronize: validate.DB_SYNCHRONIZE,
    maxConnections: validate.DB_MAX_CONNECTIONS,
    log:
      process.env.NODE_ENV === 'production'
        ? ['error']
        : ['info', 'warn', 'error', 'schema', 'log', 'query'],
  };
});
