import dotenv from 'dotenv';

dotenv.config();

import { HttpStatus, Logger } from '@nestjs/common';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { WinstonModule } from 'nest-winston';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

import { AllExceptionsFilter } from 'src/@shared/filtersErrors/allExceptions.filter';
import { formatValidationError } from 'src/@shared/filtersErrors/formatValidationError';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { createLogInstance } from './logs';


async function bootstrap() {
  const DEVELOPMENT = process.env.NODE_ENV === 'development';

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: createLogInstance(DEVELOPMENT),
    }),
  });

  if (DEVELOPMENT) {
    const config = new DocumentBuilder()
      .setTitle('Scheduler API')
      .setDescription('Scheduler API')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .setExternalDoc('DOCS', '/api/json')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document, {
      jsonDocumentUrl: '/api/json',
    });
  }

  app.enableCors();

  const logger = new Logger('bootstrap');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      errorFormatter: (error) => formatValidationError(error),
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  const port = process.env.PORT || 3000;

  await app.listen(port);

  logger.log(`Server running on port ${port} 🚀...`);

  if (DEVELOPMENT) {
    logger.log(`Swagger is running on http://localhost:${port}/api`);
  }
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
  process.exit(1);
});
