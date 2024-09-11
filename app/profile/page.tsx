import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { CustomJwtPayload } from "types/Jwt.type";

export default function ProfileView() {
  const token = cookies().get("token");
  if (!token) redirect("/auth/login");

  const decoded = jwtDecode<CustomJwtPayload>(token.value);
  const userId = decoded.nameid;
  const role = decoded.role.toLowerCase();

  return (
    <div>
      <div>
        <div>{role}</div>
      </div>
    </div>
  );
}
