export type SignupRequest = {
  id: number;
  accountId: number;
  firstName: string;
  lastName: string;
  submissionDate: string; // Alternatively, you can use Date if you're working with Date objects
  signUpRequest: number;
};

export type SignupRequestsResult =
  | { doctorSignupRequest: SignupRequest; biochemistSignupRequest: null }
  | { doctorSignupRequest: null; biochemistSignupRequest: SignupRequest }
  | { doctorSignupRequest: null; biochemistSignupRequest: null };
