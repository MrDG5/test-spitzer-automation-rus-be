import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const GLOBAL_APP_PREFIX = 'api'; // TODO: add prefix to env
  app.setGlobalPrefix(GLOBAL_APP_PREFIX);

  // Swagger
  const swgrDocConfig = new DocumentBuilder()
    .setTitle('Test Spitzer Automation RUS BE')
    .setDescription('API Documentation')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
      bearerFormat: 'JWT',
    })
    .build();

  const swgrDocument = SwaggerModule.createDocument(app, swgrDocConfig);

  const SWAGGER_PATH = 'api-docs'; // TODO: add to env
  SwaggerModule.setup(SWAGGER_PATH, app, swgrDocument);

  const API_PORT = 3000; // TODO: add to env
  await app.listen(API_PORT);
}
bootstrap();
