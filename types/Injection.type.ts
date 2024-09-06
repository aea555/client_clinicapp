import { BaseType } from "./BaseType.type";

export interface Injection extends BaseType {
  patientId: number;
  doctorId: number;
  drugId: number;
}
