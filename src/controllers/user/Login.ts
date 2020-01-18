import { Request, Response, NextFunction } from 'express'
import { validateLoginInput } from '../../utils/validator'
import HttpException from '../../exceptions/HttpException'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes'
import User from '../../mongoModels/User'
import bcrypt from 'bcryptjs'
import isEmail from 'validator/lib/isEmail'

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usernameOrEmail, password } = req.body

    const { valid, errors } = validateLoginInput(
      usernameOrEmail,
      password
    )

    if (!valid) {
      const errorText: string =
        errors[Object.keys(errors)[0]]
      throw new HttpException(UNPROCESSABLE_ENTITY, errorText)
    }

    const findParams = isEmail(usernameOrEmail) ? { email: usernameOrEmail } : { username: usernameOrEmail }
    const user = await User.findOne(findParams)

    if (!user) {
      const errorText: string = '用户不存在'
      throw new HttpException(UNPROCESSABLE_ENTITY, errorText)
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      const errorText: string = '密码错误'
      throw new HttpException(UNPROCESSABLE_ENTITY, errorText)
    }

    const token = 'Bearer ' + user.generateToken()

    res.json({
      success: true,
      data: token,
      message: '登录成功'
    })
  } catch (error) {
    next(error)
  }
}