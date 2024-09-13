import { Spinner } from "flowbite-react";
import React, { Suspense } from "react";
import ConfirmForm from "./ConfirmForm";

export default function ConfirmPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex w-full flex-col items-center justify-center p-4 lg:p-8">
        <div className="flex w-1/3 max-w-sm flex-col space-y-6 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <Suspense
            fallback={
              <div className="text-center">
                <Spinner size="xl" aria-label="Loading" />
              </div>
            }
          >
            <ConfirmForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
