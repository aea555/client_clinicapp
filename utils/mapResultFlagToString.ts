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
