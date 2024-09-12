import { Spinner } from "flowbite-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function HomePage() {
  const token = cookies().get("token");
  if (!token) redirect("/auth/login");
  else redirect("/dashboard");

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    ></Suspense>
  );
}
