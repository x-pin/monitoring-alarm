import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

/**
 * 自定义异常类型
 */

interface IExceptionInfo {
  message: string;
  data?: any;
}
export class CustomNotFoundException extends HttpException {
  constructor(info: string | IExceptionInfo, code?: number) {
    let data, message;
    if (typeof info === 'object'){
      data = info.data;
      message = info.message;
    } else {
      message = info;
    }
    super({message,code, data}, HttpStatus.NOT_FOUND);
  }
}