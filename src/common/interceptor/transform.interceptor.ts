import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResultData } from '../utils/result'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    
    return next.handle().pipe(
      map((data) => {
        return ResultData.ok(data)
      }),
    )
  }
}
