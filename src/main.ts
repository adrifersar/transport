import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');

  if (!appConfig) {
    throw new Error('App configuration not found');
  }

  app.setGlobalPrefix(appConfig.apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Transport api')
    .setDescription('Transport endpoints')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();
  //const document = () => SwaggerModule.createDocument(app, config);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
      showRequestDuration: true,
      operationsSorter: 'alpha', // 'alpha' (ascendente), 'method' (por método HTTP)
      tagsSorter: 'alpha',
    },
  });

  try {
    const yamlString = yaml.dump(document, { indent: 2 });
    fs.writeFileSync('./swagger.yaml', yamlString);
    console.log('Documentación Swagger exportada a swagger.yaml');
  } catch (err) {
    console.error('Error al generar el swagger.yaml:', err);
  }

  await app.listen(appConfig.port, () => {
    console.log('listening in port ' + appConfig.port);
  });
}
bootstrap();
