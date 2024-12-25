import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import validationPipeOptions from './common/validation-pipe.option';

const NestLogger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config
  const configService = app.get(ConfigService);
  const NODE_ENV = configService.getOrThrow('app.nodeEnv');
  const API_HOST = configService.getOrThrow('app.apiHost');
  const API_PORT = configService.getOrThrow('app.apiPort');
  const GLOBAL_API_PREFIX = configService.getOrThrow('app.apiPrefix');

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  app.enableCors({
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Swagger
  const SWAGGER_PATH = GLOBAL_API_PREFIX + '/api-docs';

  const swgrDocConfig = new DocumentBuilder()
    .setTitle('Test Spitzer Automation RUS BE')
    .setDescription('API Documentation')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
      bearerFormat: 'JWT',
    })
    .addSecurityRequirements('bearer')
    .build();

  const swgrDocument = SwaggerModule.createDocument(app, swgrDocConfig);

  SwaggerModule.setup(SWAGGER_PATH, app, swgrDocument);

  await app.listen(API_PORT, API_HOST, async () => {
    const appUrl = await app.getUrl();
    NestLogger.log(`🚀 Server NestApi running. Application on url: ${appUrl}`);
    NestLogger.log(`📗 Swagger url: ${SWAGGER_PATH}`);
    NestLogger.log(
      `✨ ${API_HOST}:${API_PORT} | mode: ${NODE_ENV} | pid: ${process.pid}`,
    );
  });
}
bootstrap();
