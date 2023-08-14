import { User } from "../entities/user"


export interface UserRepository {
  add(user: User): Promise<User>
  verifyIsUserExists(email: string): Promise<any>
}