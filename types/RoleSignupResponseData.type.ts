import { ServiceResult } from "./ServiceResult";

export type RoleSignupResponseData = {
  accountId: number;
  firstName: string;
  lastName: string;
  signUpRequest: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type RoleSignupResponse = ServiceResult<RoleSignupResponseData[]>;