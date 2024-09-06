import { BaseType } from "./BaseType.type";

export interface Clinic extends BaseType {
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
  breakStartTime: string;
  breakEndTime: string;
}
