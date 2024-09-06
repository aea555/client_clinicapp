import { Button, Label, Radio, Spinner, TextInput } from "flowbite-react";
import React, { Suspense } from "react";
import ClinicUpdateOrAddForm from "./ClinicUpdateOrAddForm";

export default function ClinicsManagementAdminView() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex w-full flex-row flex-wrap items-start gap-6 p-6">
        <ClinicUpdateOrAddForm />
      </div>
    </Suspense>
  );
}
