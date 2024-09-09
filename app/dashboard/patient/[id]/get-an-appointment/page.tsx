import { GetAllClinics } from 'apicalls/Clinic/GetAllClinics';
import React, { Suspense } from 'react'
import ClinicSelect from './ClinicSelect';
import { Spinner } from 'flowbite-react';

async function getRelatedData() {
  const res = await GetAllClinics();
  if (res.success) return res.data;
  return [];
}

export default async function GetAnAppointmentPatientView() {
  const data = await getRelatedData();

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
    <div className="flex min-h-screen flex-col justify-between gap-6 p-6">
      {data && <ClinicSelect clinics={data} />}
    </div>
    </Suspense>
  )
}
