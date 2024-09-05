export type SignupRequest = {
  id: number;
  accountId: number;
  firstName: string;
  lastName: string;
};

export type SignupRequestsResult =
  | { doctorSignupRequest: SignupRequest; biochemistSignupRequest: null }
  | { doctorSignupRequest: null; biochemistSignupRequest: SignupRequest }
  | { doctorSignupRequest: null; biochemistSignupRequest: null };
