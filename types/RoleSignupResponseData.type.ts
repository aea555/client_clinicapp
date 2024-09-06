import { BaseType } from "./BaseType.type";
import { ServiceResult } from "./ServiceResult";

export interface RoleSignupResponseData extends BaseType {
  accountId: number;
  firstName: string;
  lastName: string;
  signUpRequest: number;
}

export type RoleSignupResponse = ServiceResult<RoleSignupResponseData[]>;