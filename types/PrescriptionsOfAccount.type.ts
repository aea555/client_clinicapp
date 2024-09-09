export interface PrescriptionsOfAccount {
  id: number;
  createdAt: string;
  name: string;
  durationDays: number;
  prescriptionId: number;
  drugId: number;
  firstName: string;
  lastName: string;
  doctorId: number;
}
