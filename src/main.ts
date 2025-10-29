import express from 'express'
import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { logger } from './common/libs/log4js/logger.middleware'
import { Logger } from './common/libs/log4js/log4j.util'
import { TransformInterceptor } from './common/interceptor/transform.interceptor'
import { HttpExceptionsFilter } from './common/filter/http-exceptions-filter'
import { ExceptionsFilter } from './common/filter/exceptions-filter'
import Chalk from 'chalk'
import { CustomExceptionsFilter } from './common/filter/custom-exceptions-filter'

async function bootstrap() {
  // 创建 app
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })
  const config = app.get(ConfigService)
  // 设置 api 访问前缀
  const prefix = config.get<string>('app.prefix')
  app.setGlobalPrefix(prefix)

  app.enableCors({
    origin: true,
  })
  const swaggerOptions = new DocumentBuilder()
    .setTitle('监控告警 App')
    .setDescription('监控告警 App 接口文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  // 项目依赖当前文档功能，最好不要改变当前地址
  // 生产环境使用 nginx 可以将当前文档地址 屏蔽外部访问
  SwaggerModule.setup(`${prefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: '监控告警 API Docs',
  })

  // 全局验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
      forbidUnknownValues: false,
    }),
  )

  // 日志
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(logger)
  // 使用全局拦截器打印出参
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  // 所有异常
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  app.useGlobalFilters(new CustomExceptionsFilter())
  // 获取配置端口
  const port = config.get<number>('app.port') || 8080
  await app.listen(port)

  Logger.log(
    Chalk.green(`监控告警服务启动成功`),
    '\n',
    Chalk.green('服务地址'),
    `                http://localhost:${port}${prefix}/`,
    '\n',
    Chalk.green('swagger 文档地址        '),
    `http://localhost:${port}${prefix}/docs/`,
  )
}

bootstrap()
