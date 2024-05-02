import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception-filters';
import { Logger } from 'nestjs-pino';
// import { SecretsManager } from 'aws-sdk';

import helmet from 'helmet';

// The checkEnvironment function checks if all required environment variables are defined.
// If any of the required environment variables are undefined, the function throws an error.
// Can be extended to check CLIENT_ORIGIN_URL, CLIENT_VERSION etc.
function checkEnvironment(configService: ConfigService) {
  const requiredEnvVars = [
    'PORT',
    'NODE_ENV',
    'AES_ENCRYPTION_METHOD',
    'AES_SECRET_KEY',
    'API_TOKEN',
    'DATABASE_URL',
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!configService.get<string>(envVar)) {
      throw Error(`Undefined environment variable: ${envVar}`);
    }
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);

  // ValidationPipe is a built-in pipe that uses the class-validator library to automatically validate incoming requests.
  // The transform option is set to true to transform payloads into instances of the DTO classes.
  // Enabling the enableImplicitConversion option allows the pipe to convert incoming request payloads to the expected types.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // The HttpExceptionFilter class is a custom exception filter that catches all
  // HttpExceptions and returns a JSON response with the error message.
  app.useGlobalFilters(new HttpExceptionFilter());

  // Helmet is a middleware that helps secure Express apps by setting various HTTP headers.
  app.use(helmet());

  app.useLogger(app.get(Logger));

  app.enableCors({
    origin: configService.get<string>('CLIENT_ORIGIN_URL'),
    methods: ['GET'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  });

  // Disable swagger for production environment
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Secret Notes API')
      .setDescription('The Spherity Secret notes API description')
      .setVersion('1.0')
      .addTag('Secret Notes')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'string',
          name: 'Authorization',
          description: 'Enter API key',
          in: 'header',
        },
        'apiKey',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(3000);
}
bootstrap();
