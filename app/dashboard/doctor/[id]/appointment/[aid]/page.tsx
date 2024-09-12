import { Spinner } from "flowbite-react";
import React, { Suspense } from "react";
import AddPrescription from "./AddPrescription";
import Tests from "./Tests";
import AddNote from "./AddNote";
import AddTest from "./AddTest";
import CompleteAppointment from "./CompleteAppointment";
import { GetAppointment } from "apicalls/Appointment/GetAppointment";
import { redirect } from "next/navigation";
import PatientAbsent from "./PatientAbsent";

async function fetchAppointment(aid: string) {
  const appointment = await GetAppointment({ appointmentId: Number(aid) });
  if (!appointment.success) return undefined
  return appointment.data;
}

export default async function AppointmentPageDoctor({
  params: { aid },
}: {
  params: { aid: string };
}) {
  const appointment = await fetchAppointment(aid)
  if (!appointment) {
    redirect('/dashboard')
  }

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 rounded-lg bg-white p-6 md:grid-cols-2">
          <div className="">
            <AddPrescription
              doctorId={Number(appointment?.doctorId)}
              patientId={Number(appointment?.patientId)}
              appointmentId={Number(aid)}
            />
          </div>

          <div>
            <AddTest appointmentId={Number(aid)} />
          </div>

          <div className="">
            <AddNote
              appointmentId={Number(aid)}
              existingNotes={appointment?.notes}
            />
          </div>

          <div className="">
            {aid && <Tests appointmentId={Number(aid)} />}
          </div>

          <div className="flex flex-row flex-wrap gap-3">
            {aid && <CompleteAppointment appointmentId={Number(aid)} />}
            {aid && <PatientAbsent appointmentId={Number(aid)} />}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
