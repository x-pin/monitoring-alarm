import { NextFunction, Request, Response } from 'express'
import { Logger } from './log4j.util'

export function logger(req: Request, res: Response, next: NextFunction) {
  const statusCode = res.statusCode
  const logFormat = `
################ logger.middleware #####################
RequestOriginal: ${req.originalUrl}
Method：${req.method}
StatusCode: ${statusCode}
IP: ${req.ip}
Params: ${JSON.stringify(req.params)}
Query: ${JSON.stringify(req.query)}
Body: ${JSON.stringify(req.body)}
################ logger.middleware end #################
`

  next()

  if (statusCode >= 500) {
    Logger.error(logFormat)
  } else if (statusCode >= 400) {
    Logger.warn(logFormat)
  }
}
