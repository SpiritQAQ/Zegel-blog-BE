import { Schema, model, Model, Document } from 'mongoose'

export interface IUserDocument extends Document {
  username: string
  email: string
  password: string
  createAt: string
  _doc: IUserDocument
}

const userSchema: Schema = new Schema({
  // model级别检测 和 validateRegisterInput的业务级别检测可以同时存在配合使用
  username: {
    type: String,
    trim: true,
    required: [true, '用户名不得为空'],
    minlength: [5, '用户名最小长度为5个字符']
  },
  email: String,
  password: String,
  createAt: String
})

const User: Model<IUserDocument, {}> = model<IUserDocument>('User', userSchema)

export default User
