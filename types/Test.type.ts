import { BaseType } from "./BaseType.type"

export interface Test extends BaseType {
  name: string
  unitType: string
  rangeStartMale: number
  rangeEndMale: number
  rangeStartFemale: number
  rangeEndFemale: number
  desc: string
}
