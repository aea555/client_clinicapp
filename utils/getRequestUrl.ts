export function getRequestUrl(baseUrl: string, role: string): string {
  const urlMap: { [key: string]: string } = {
    doctor: `${baseUrl}DoctorSignupRequest`,
    "0": `${baseUrl}DoctorSignupRequest`,
    biochemist: `${baseUrl}BiochemistSignupRequest`,
    "1": `${baseUrl}BiochemistSignupRequest`,
  };

  return urlMap[role] || ""; 
}