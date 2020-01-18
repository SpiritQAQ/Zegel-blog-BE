import { Response, NextFunction } from 'express'
import HttpException from '../exceptions/HttpException'
import { UNAUTHORIZED } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../mongoModels/User'
import { JwtPayload } from '../types/Jwt'
import { RequestWithUser } from '../types/RequestWithUser'

const checkAuthMiddleware = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers['authorization']

    if (authorizationHeader) {
      const token = authorizationHeader.split('Bearer ')[1]
      console.log("TCL: token", token)

      if (token) {
        const jwtData = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload
        console.log("TCL: jwtData", jwtData)

        const user = await User.findById(jwtData.id)

        if (user) {
          req.currentUser = user
          return next()
        } else {
          throw new HttpException(UNAUTHORIZED, '登录状态过期，请重新登录')
        }
      } else {
        throw new HttpException(UNAUTHORIZED, 'token类型错误')
      }
    } else {
      throw new HttpException(UNAUTHORIZED, '用户认证信息为空')
    }
  } catch (error) {
    next(error)
  }
}

export default checkAuthMiddleware