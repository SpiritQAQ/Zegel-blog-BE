import { Request, Response, NextFunction } from 'express'
import { validateRegisterInput } from '../../utils/validator'
import HttpException from '../../exceptions/HttpException'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes'
import User from '../../mongoModels/User'

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, confirmPassword, email } = req.body

    const validateResult = validateRegisterInput(
      username,
      password,
      confirmPassword,
      email
    )

    if (!validateResult.valid) {
      const errorText: string =
        validateResult.errors[Object.keys(validateResult.errors)[0]]
      throw new HttpException(UNPROCESSABLE_ENTITY, errorText)
      // res.json({
      //   success: false,
      //   message: errorText
      // })
    }

    const user = await User.findOne({ username })
    if (user) {
      throw new HttpException(UNPROCESSABLE_ENTITY, '用户名已存在')
    }

    const hadEmail = await User.findOne({ email })
    if (hadEmail) {
      throw new HttpException(UNPROCESSABLE_ENTITY, '邮箱已被使用')
    }

    const newUser = new User({
      username,
      email,
      password
    })

    const resUser = await newUser.save()

    console.log('TCL: resUser', resUser)
    res.json({
      success: true,
      data: resUser._doc,
      message: '注册成功'
    })
  } catch (error) {
    next(error)
  }
  // res.json(req.body)
}