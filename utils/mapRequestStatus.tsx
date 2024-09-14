import React from "react";

export function mapRequestStatusToSpan(code: number): React.JSX.Element {
  const flagMap: { [key: number]: React.JSX.Element } = {
    0: <span className="font-bold text-yellow-500">BEKLEMEDE</span>,
    1: <span className="font-bold text-blue-500">KABUL EDİLMİŞ</span>,
    2: <span className="font-bold text-red-500">REDDEDİLMİŞ</span>,
  };
  return (
    flagMap[code] || <span className="font-bold text-black">YOK</span>
  );
}

export function mapRequestStatusToString(flag: number): string {
  const flagMap: { [key: string | number]: string } = {
    0: "BEKLEMEDE",
    1: "KABUL EDİLMİŞ",
    2: "REDDEDİLMİŞ",
  };

  return flagMap[flag] || "";
}

export const RequestStatuses = {
  0: "BEKLEMEDE",
  1: "KABUL EDİLMİŞ",
  2: "REDDEDİLMİŞ",
};
