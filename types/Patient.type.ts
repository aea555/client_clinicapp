import { BaseType } from "./BaseType.type";

export interface Patient extends BaseType {
  accountId: number;
  firstName: string;
  lastName: string;
}
