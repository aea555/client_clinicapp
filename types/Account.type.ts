import { BaseType } from "./BaseType.type";

export interface Account extends BaseType {
  email: string,
  passwordHash: string,
  role: Number
}