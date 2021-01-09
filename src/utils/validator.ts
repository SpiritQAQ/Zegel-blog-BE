import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import { IUserDocument } from '../mongoModels/User'
import HttpException from '../exceptions/HttpException'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes'

interface RegisterInputError extends Partial<IUserDocument> {
  confirmPassword?: string
}

interface LoginInputError extends Partial<IUserDocument> {
}

export const validateRegisterInput = (
  username: IUserDocument['username'],
  password: IUserDocument['password'],
  confirmPassword: IUserDocument['password'],
  email: IUserDocument['email']
) => {
  let errors: RegisterInputError = {}

  if (isEmpty(username)) {
    errors.username = '用户名不能为空'
  }
  if (isEmpty(password)) {
    errors.password = '密码不能为空'
  }
  if (isEmpty(confirmPassword)) {
    errors.password = '确认密码不能为空'
  }
  if (confirmPassword !== password) {
    errors.password = '两次密码输入不同，请检查'
  }
  if (isEmpty(email)) {
    errors.email = '邮箱不能为空'
  }
  if (!isEmail(email)) {
    errors.email = '请输入正确的邮箱地址'
  }

  return { errors, valid: Object.keys(errors).length < 1 }
}

export const validateLoginInput = (
  password: IUserDocument['password'],
  usernameOrEmail: string
) => {
  let errors: LoginInputError = {}

  if (isEmpty(usernameOrEmail)) {
    errors.username = '用户名或邮箱不能为空'
  }
  if (isEmpty(password)) {
    errors.password = '密码不能为空'
  }

  return { errors, valid: Object.keys(errors).length < 1 }

}

export const checkPostBody = (body: string) => {
  if (isEmpty(body.trim())) {
    throw new HttpException(UNPROCESSABLE_ENTITY, 'Body不能为空')
  }
}
