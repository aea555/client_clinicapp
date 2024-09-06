import { BaseType } from "./BaseType.type";
import { ServiceResult } from "./ServiceResult";

export interface Appointment extends BaseType {
  clinicId: number;
  clinic: any; 
  doctorId: number;
  doctor: any; 
  patientId: number;
  patient: any; 
  appointmentStatus: number;
  startTime: string; 
  finishTime: string | null; 
  notes: string | null;
}

export type GetAllAppointmentsResponse = ServiceResult<Appointment[]>;