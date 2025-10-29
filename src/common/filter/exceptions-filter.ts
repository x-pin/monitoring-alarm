import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'

import { Logger } from '../libs/log4js/log4j.util'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    Logger.error(`Service Error -> 全局过滤器: ${exception}`)
    response.status(status).json({
      code: status,
      msg: `Service Error: ${exception}`,
    })
  }
}
