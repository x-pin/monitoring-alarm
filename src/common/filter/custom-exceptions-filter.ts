import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Logger } from '../libs/log4js/log4j.util'
import { CustomNotFoundException } from '../exceptions/custom-exception'
import { ResultData } from '../utils/result'

/**
 * 自定义异常过滤器
 */
@Catch(CustomNotFoundException)
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const {code, message, data} = exception.getResponse()

    response.status(200).json(ResultData.fail(code, message, data))
  }
}
