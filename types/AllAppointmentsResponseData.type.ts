import { ServiceResult } from "./ServiceResult";

export interface Appointment {
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
  id: number;
  createdAt: string; 
  updatedAt: string; 
  isDeleted: boolean;
}

export type GetAllAppointmentsResponse = ServiceResult<Appointment[]>;