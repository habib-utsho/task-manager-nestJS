import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ResponseFormatInterceptor } from './common/response-format.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api')

  app.useGlobalInterceptors(
    new ResponseFormatInterceptor()
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )


  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
