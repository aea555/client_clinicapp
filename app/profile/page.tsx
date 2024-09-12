import { Spinner } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { CustomJwtPayload } from "types/Jwt.type";
import UpdateUserEmail from "./UpdateUserEmail";
import UpdateUserPassword from "./UpdateUserPassword";

export default function ProfileView() {
  const token = cookies().get("token");
  if (!token) redirect("/auth/login");

  const decoded = jwtDecode<CustomJwtPayload>(token.value);
  const id = decoded.nameid;
  // const role = decoded.role.toLowerCase();

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="min-h-screen p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <UpdateUserEmail accountId={Number(id)} />
          <UpdateUserPassword accountId={Number(id)} />
        </div>
      </div>
    </Suspense>
  );
}
