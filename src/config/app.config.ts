import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { validateConfig } from './validate.config';

enum EnvironmentEnum {
  Development = 'development',
  Production = 'production',
}

export type AppConfig = {
  nodeEnv: `${EnvironmentEnum}`;
  apiHost: string;
  apiPort: number;
  apiPrefix: string;
};

class EnvironmentVariblesValidator {
  @IsEnum(EnvironmentEnum)
  @IsOptional()
  NODE_ENV: `${EnvironmentEnum}`;

  @IsUrl({ require_tld: false })
  API_HOST: string;

  @Type(() => Number)
  @IsInt()
  @Min(1024)
  @Max(49151)
  @IsOptional()
  API_PORT: number;

  @IsString()
  API_PREFIX: string;
}

export default registerAs<AppConfig>('app', (): AppConfig => {
  const validateEnv = validateConfig(process.env, EnvironmentVariblesValidator);

  return {
    nodeEnv: validateEnv.NODE_ENV || 'development',
    apiHost: validateEnv.API_HOST || 'http://localhost',
    apiPort: validateEnv.API_PORT || 7000,
    apiPrefix: validateEnv.API_PREFIX || 'api',
  };
});
