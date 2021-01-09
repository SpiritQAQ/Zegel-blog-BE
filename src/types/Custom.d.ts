import { IUserDocument } from "src/mongoModels/User";

declare global {
  namespace Express {
    export interface Request {
      currentUser?: IUserDocument
    }
  }
}