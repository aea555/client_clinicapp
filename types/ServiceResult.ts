export interface ServiceResult<T = any, T1 = any | null> {
  success: boolean;
  errorMessage: string;
  message: string;
  statusCode: number;
  data: T | null;
  extraData?: T1 | null;
}