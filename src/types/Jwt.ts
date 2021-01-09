import { IUserDocument } from "../mongoModels/User";

export interface JwtPayload {
  id: IUserDocument['_id']
}