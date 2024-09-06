import { BaseType } from "./BaseType.type";

export interface Feedback extends BaseType {
  patientId: number;
  doctorId: number;
  appointmentId: number;
  rating: number;
  comment: string;
}
