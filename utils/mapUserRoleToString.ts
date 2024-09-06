export function mapUserRoleToString(role: number): string {
  const roleMap: { [key: string | number]: string } = {
    0: "KAYITSIZ",
    1: "HASTA",
    2: "DOKTOR",
    3: "BİYOKİMYAGER",
    4: "YÖNETİCİ",
  };

  return roleMap[role] || "";
}

export const RoleFlags = {
  0: "KAYITSIZ",
  1: "HASTA",
  2: "DOKTOR",
  3: "BİYOKİMYAGER",
  4: "YÖNETİCİ",
};
