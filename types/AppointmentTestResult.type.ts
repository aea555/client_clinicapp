import { Appointment } from "./AllAppointmentsResponseData.type";
import { Test } from "./Test.type";

export interface AppointmentTest {
  appointmentId: number;
  appointment: null;
  testId: number; 
  test: Test;
  id: number;
  createdAt: string; 
  updatedAt: string; 
  isDeleted: boolean;
}

export interface AppointmentTestResult {
  appointmentTestId: number;
  appointmentTest: AppointmentTest;
  resultDate: string;
  value: number;
  biochemistId: number;
  biochemist: null;
  resultFlag: number;
  id: number;
  createdAt: string; 
  updatedAt: string; 
  isDeleted: boolean;
}