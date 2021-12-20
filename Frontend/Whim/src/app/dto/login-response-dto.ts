import {User} from "../models/user";

export interface loginResponse {
    user: User,
    token: string
}