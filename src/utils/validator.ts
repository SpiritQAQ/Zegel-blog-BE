import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

interface RegisterInputError {
  username?: string
  password?: string
  email?: string
  confirmPassword?: string
}

export const validateRegisterInput = (
  username: string,
  password: string,
  confirmPassword: string,
  email: string
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
