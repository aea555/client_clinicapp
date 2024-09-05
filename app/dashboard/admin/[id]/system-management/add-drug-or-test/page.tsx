import DrugUpdateOrAddForm from "components/partials/DrugUpdateOrAddForm";
import TestUpdateOrAddForm from "components/partials/TestUpdateOrAddForm";
import { Button, Label, Radio, Spinner, TextInput } from "flowbite-react";
import React, { Suspense } from "react";

export default function DrugManagementAdminView() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex w-full flex-row flex-wrap items-start gap-6 p-6">
        <TestUpdateOrAddForm />
        <DrugUpdateOrAddForm />
      </div>
    </Suspense>
  );
}
