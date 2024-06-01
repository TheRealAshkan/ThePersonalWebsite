import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
export let NestExpressApp: any = {};

async function bootstrap() {
  NestExpressApp = await NestFactory.create<NestExpressApplication>(AppModule);
  NestExpressApp.enableCors();
  NestExpressApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  NestExpressApp.use(
    session({
      secret: 'secret',
    }),
  );
  NestExpressApp.use(passport.initialize());
  NestExpressApp.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Api Document')
    .setDescription('The Api Document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(NestExpressApp, config);
  SwaggerModule.setup('docs', NestExpressApp, document);

  await NestExpressApp.listen(3210);
}

bootstrap();