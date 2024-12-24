import { IsNotEmpty, IsString } from 'class-validator';
import { validateConfig } from './validate.config';
import { registerAs } from '@nestjs/config';

export type SecretConfig = {
  jwtAccesTokenSecret: string;
};

class EnvironmentVariblesValidator {
  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;
}

export default registerAs<SecretConfig>('secret', (): SecretConfig => {
  const validateEnv = validateConfig(process.env, EnvironmentVariblesValidator);

  return {
    jwtAccesTokenSecret: validateEnv.JWT_ACCESS_TOKEN_SECRET,
  };
});
