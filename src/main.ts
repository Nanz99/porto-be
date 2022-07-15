import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('PORTO')
    .setDescription('The PORTO API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 7070, () =>
    console.log(`http://localhost:${process.env.PORT}`),
  );
}
bootstrap();
