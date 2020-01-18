import { Request } from 'express'
import { IUserDocument } from 'src/mongoModels/User';

export interface RequestWithUser extends Request {
  currentUser?: IUserDocument
}