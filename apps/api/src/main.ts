import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import multipart from '@fastify/multipart'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const start = Date.now()
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  const fastifyInstance = app.getHttpAdapter().getInstance()
  await fastifyInstance.register(multipart as any)

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Documentation')
    .setDescription('API Description')
    .setVersion('1.0')
    .addTag('auth')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  if (process.env.ENV === 'development') {
    const docsDir = join(process.cwd(), 'src/docs')
    mkdirSync(docsDir, { recursive: true })
    writeFileSync(join(docsDir, 'swagger.json'), JSON.stringify(document, null, 2))
  }

  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(process.env.PORT || 8000)
  console.log(`🚀 App started in ${Date.now() - start}ms`)
}
bootstrap()
