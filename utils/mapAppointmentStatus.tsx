import React from "react"

export function mapAppointmentStatusToSpan(code: number): React.JSX.Element{
  const statusMap: {[key: number]: React.JSX.Element} = {
    0: <span className="font-bold text-blue-500">ONAYLANDI</span>,
    1: <span className="font-bold text-green-500">TAMAMLANDI</span>,
    2: <span className="font-bold text-red-500">İPTAL EDİLDİ</span>,
    3: <span className="font-bold text-pink-600">HASTA GELMEDİ</span>,
  }
  return statusMap[code] || <span className="font-bold text-black">BULUNAMADI</span>
}

export function mapAppointmentStatus(code: number): string{
  const statusMap: {[key: number]: string} = {
    0: "ONAYLANDI",
    1: "TAMAMLANDI",
    2: "İPTAL EDİLDİ",
    3: "HASTA GELMEDİ",
  }
  return statusMap[code] || ""
}

export const StatusMap = {
  0: "ONAYLANDI",
  1: "TAMAMLANDI",
  2: "İPTAL EDİLDİ",
  3: "HASTA GELMEDİ",
};