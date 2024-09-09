export interface AppointmentsOfAccount {
  id: number;
  appointmentStatus: number
  name: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  finishTime: string | null;
  startTime: string;
}
