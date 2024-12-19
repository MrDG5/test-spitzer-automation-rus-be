import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateConfig<T extends object>(
  processEnv: Record<string, unknown>,
  envVariableClass: ClassConstructor<T>,
) {
  const validateEnv = plainToClass(envVariableClass, processEnv, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validateEnv, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validateEnv;
}
