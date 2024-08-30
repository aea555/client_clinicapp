export interface ServiceResult<T = any> {
  success: boolean;
  errorMessage: string;
  message: string;
  statusCode: number;
  data: T;
}