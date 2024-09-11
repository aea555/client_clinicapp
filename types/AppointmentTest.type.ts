import { BaseType } from "./BaseType.type";
import { Test } from "./Test.type";

export interface AppointmentTest extends BaseType {
  appointmentId: number;
  appointment?: any;
  testId: number;
  test?: Test | null;
}
