import { BaseType } from "./BaseType.type";

export interface SignupRequest extends BaseType {
  id: number;
  accountId: number;
  firstName: string;
  lastName: string;
};

export type SignupRequestsResult =
  | { doctorSignupRequest: SignupRequest; biochemistSignupRequest: null }
  | { doctorSignupRequest: null; biochemistSignupRequest: SignupRequest }
  | { doctorSignupRequest: null; biochemistSignupRequest: null };
