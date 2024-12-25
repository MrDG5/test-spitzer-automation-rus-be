import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
function mapValidationErrors(errors: ValidationError[]): any {
  return errors.reduce((result, error) => {
    // If there are child errors (nested or object arrays)
    if (error.children && error.children.length > 0) {
      // Recursive call for nested structures
      result[error.property] = mapValidationErrors(error.children);
    } else {
      // If the errors are related to the current field
      result[error.property] = Object.values(error.constraints || {}).join(
        ', ',
      );
    }
    return result;
  }, {});
}

const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        success: false,
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        error: mapValidationErrors(errors),
        timestamp: new Date().toLocaleTimeString('ru', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }),
        message: 'Validation error',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
};

export default validationPipeOptions;
