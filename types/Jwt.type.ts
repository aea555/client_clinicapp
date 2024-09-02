import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  nameid: string;
  role: string;
}