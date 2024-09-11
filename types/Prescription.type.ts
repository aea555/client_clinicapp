"data"
import { Appointment } from "./AllAppointmentsResponseData.type"
import { BaseType } from "./BaseType.type"
import { Doctor } from "./Doctor.type"
import { Patient } from "./Patient.type"

export interface Prescription extends BaseType {
  doctorId: number,
  doctor?: Doctor | null,
  patientId: number,
  patient?: Patient | null,
  appointmentId: number,
  appointment?: Appointment | null,
  durationDays: number,
  notes?: string | null
};