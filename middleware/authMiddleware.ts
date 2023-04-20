import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/api-error.js'
import tokenService from '../service/token-service.js'

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    console.log(333, accessToken)
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    console.log(444, userData)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    //@ts-ignore
    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
