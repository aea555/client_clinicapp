export interface AppointmentScreenResults {
  id: number;
  testName: string;
  unitType: string;
  patientId: number;
  appointmentTestResults: SubGroupTestResult[]
};

interface SubGroupTestResult {
  id: number;
  value: number;
  resultDate: string;
  resultFlag: number;
};
