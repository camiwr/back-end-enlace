import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Enlace API')
    .setDescription('Documentação da API da plataforma Enlace (Comunidades e Eventos acadêmicos)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT ?? '3000');

  await app.listen(port);
  console.log(`🚀 Server rodando em http://localhost:${port}`);
  console.log(`📚 Docs disponíveis em http://localhost:${port}/api`);

}
bootstrap();
