export interface AuthState {
  jwt: string | null;
  email: string | null;
  userId: string | null;
  role: string | null;
  actions: {
    setJwt: (token: string) => void;
    clearJwt: () => void;
  }
}

