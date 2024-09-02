import AuthForm from "app/auth/login/LoginForm";
import React, { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex flex-col items-center justify-center p-4 lg:p-8 w-full">
        <div className="flex flex-col space-y-6 w-1/3 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <Suspense fallback={"Loading"}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
  
  
}
