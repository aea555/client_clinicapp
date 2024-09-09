import { BaseType } from "./BaseType.type";

export interface Doctor extends BaseType {
  accountId: number;
  clinicId: number;
  clinic: null;
  clinicRoomId: 1;
  clinicRoom: null;
  firstName: string;
  lastName: string;
}
