import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS
  const corsOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : [
        'http://localhost:3000',  // Frontend en desarrollo
        'http://localhost:3001',  // Frontend alternativo
        'https://mahg.dev',       // Dominio de producción
        'https://www.mahg.dev',   // Dominio de producción con www
      ];

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'Pragma',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  });
  
  app.useGlobalPipes(new ValidationPipe());
  console.log("PORT:",process.env.PORT ?? 3001);
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
