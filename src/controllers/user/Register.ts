import { Request, Response, NextFunction } from 'express'
import { validateRegisterInput } from '../../utils/validator'
import HttpException from '../../exceptions/HttpException'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes'
export const postRegister = (
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
    res.json('ok')
  } catch (error) {
    next(error)
  }
  // res.json(req.body)
}
