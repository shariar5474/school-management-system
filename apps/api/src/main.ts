import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());

  // Global prefix for API versioning
  app.setGlobalPrefix('api/v1');

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe with class-transformer integration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('School Management System API')
    .setDescription(
      'RESTful API for the School Management System. Provides endpoints for managing students, teachers, academics, attendance, examinations, results, admissions, finance, library, notices, and settings.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter Firebase ID token',
        in: 'header',
      },
      'firebase-auth',
    )
    .addTag('Health', 'Health check endpoint')
    .addTag('Auth', 'Authentication & authorization')
    .addTag('Users', 'User management')
    .addTag('Students', 'Student management')
    .addTag('Teachers', 'Teacher management')
    .addTag('Academics', 'Academic years, classes, sections, subjects')
    .addTag('Attendance', 'Attendance tracking')
    .addTag('Examinations', 'Exam management & marks entry')
    .addTag('Results', 'Result viewing & templates')
    .addTag('Admissions', 'Admission applications')
    .addTag('Finance', 'Fee structures, invoices & payments')
    .addTag('Library', 'Library book management')
    .addTag('Notices', 'Notices, events & gallery')
    .addTag('Settings', 'School settings')
    .addTag('Reports', 'Report generation')
    .addTag('Audit', 'Audit logs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}

bootstrap();
