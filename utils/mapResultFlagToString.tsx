import React from "react";

export function mapResultFlagToSpan(code: number): React.JSX.Element {
  const flagMap: { [key: number]: React.JSX.Element } = {
    0: <span className="font-bold text-blue-500">NORMAL</span>,
    1: <span className="font-bold text-red-500">DÜŞÜK</span>,
    2: <span className="font-bold text-red-500">YÜKSEK</span>,
  };
  return (
    flagMap[code] || <span className="font-bold text-black">SONUÇSUZ</span>
  );
}

export function mapResultFlagToString(flag: number): string {
  const flagMap: { [key: string | number]: string } = {
    0: "NORMAL",
    1: "DÜŞÜK",
    2: "YÜKSEK",
  };

  return flagMap[flag] || "";
}

export const ResultFlags = {
  0: "NORMAL",
  1: "DÜŞÜK",
  2: "YÜKSEK",
};
