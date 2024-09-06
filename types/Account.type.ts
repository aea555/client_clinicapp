import { BaseType } from "./BaseType.type";

export interface Account extends BaseType {
  email: string;
  passwordHash: string;
  gender: number;
  birthDate: string;
  role: number;
}
