import { BaseType } from "./BaseType.type"
import { Drug } from "./Drug.type"
import { Prescription } from "./Prescription.type"

export interface PrescriptionDrug extends BaseType {
  drugId: number;
  drug?: Drug | null;
  prescriptionId: number;
  prescription?: Prescription | null;
}