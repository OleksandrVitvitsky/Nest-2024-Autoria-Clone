import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { DtoMapperToOtherType } from './common/helpers/dtoMapperToOtherType';
import { AppConfig, SuperUser } from './config/config.type';
import { AppModule } from './modules/app.module';
import { AuthService } from './modules/auth/services/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');
  const superUserConfig = configService.get<SuperUser>('superUser');

  const authService = app.get<AuthService>(AuthService);
  await authService.register(
    DtoMapperToOtherType.ConfigTypeToRegisterReqDto(superUserConfig),
  );

  const config = new DocumentBuilder()
    .setTitle('"Autoria Clone" API by oleksandr.vit')
    .setDescription('The API description')
    .setVersion('1.0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 5,
      persistAuthorization: true,
    },
  });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  await app.listen(appConfig.port, () => {
    Logger.log(`Server running on http://${appConfig.host}:${appConfig.port}`);
    Logger.log(
      `Swagger running on http://${appConfig.host}:${appConfig.port}/api-docs`,
    );
  });
}

void bootstrap();
