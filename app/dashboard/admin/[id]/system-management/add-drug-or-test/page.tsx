import DrugUpdateOrAddForm from "app/dashboard/admin/[id]/system-management/add-drug-or-test/DrugUpdateOrAddForm";
import TestUpdateOrAddForm from "app/dashboard/admin/[id]/system-management/add-drug-or-test/TestUpdateOrAddForm";
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
