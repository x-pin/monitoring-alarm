import { ExecutionContext, createParamDecorator } from "@nestjs/common";

/**
 * 参数装饰器
 * 获取用户信息, 使用  @User(): 获取整个用户信息, @User('id') 获取用户id
 * @param data key值
 */
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // 从请求对象中获取用户信息
    const user = request.user;

    return data ? user?.[data] : user;
  },
);