import { BaseType } from "./BaseType.type";
import { Test } from "./Test.type";

export interface AppointmentTest extends BaseType {
  appointmentId: number;
  appointment: null;
  testId: number; 
  test: Test;
}

export interface AppointmentTestResult extends BaseType {
  appointmentTestId: number;
  appointmentTest: AppointmentTest | null;
  resultDate: string;
  value: number;
  biochemistId: number;
  biochemist: null;
  resultFlag: number;
}