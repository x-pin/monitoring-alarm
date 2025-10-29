import { SetMetadata } from '@nestjs/common'

export const ALLOW_ANON = Symbol('ALLOW_ANONd')
/**
 * 允许 接口 不校验 token
 */
export const AllowAnon = () => SetMetadata(ALLOW_ANON, true)
