import { Request, Response, NextFunction } from 'express'
import { validateRegisterInput } from '../../utils/validator'
import HttpException from '../../exceptions/HttpException'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes'
import User from '../../mongoModels/User'

export const postRegister = async (
  req: Request,
  _res: Response,
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

    const user = new User({
      username,
      email,
      password
    })

    const newUser = await user.save()

    console.log('TCL: newUser', newUser)
  } catch (error) {
    next(error)
  }
  // res.json(req.body)
}
