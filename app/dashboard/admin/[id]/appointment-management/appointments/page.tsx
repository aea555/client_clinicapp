import { GetAllAppointments } from "apicalls/Appointment/GetAllAppointments";
import AppointmentNotesUpdate from "app/dashboard/admin/[id]/appointment-management/appointments/AppointmentNotesUpdate";
import AppointmentStatusSelect from "app/dashboard/admin/[id]/appointment-management/appointments/AppointmentStatusSelect";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { Suspense } from "react";

async function getRelatedData() {
  const res = await GetAllAppointments();
  if (res.success) return res.data;
  return [];
}

export default async function AppointmentsManagementAdminView() {
  const data = await getRelatedData();

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex min-h-screen flex-col justify-between gap-5 p-6">
        <div className="flex flex-1 flex-col gap-3 overflow-x-auto">
          <h5 className="text-lg font-semibold">Randevular</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>RANDEVU ID</TableHeadCell>
              <TableHeadCell>KLİNİK ID</TableHeadCell>
              <TableHeadCell>DOKTOR ID</TableHeadCell>
              <TableHeadCell>HASTA ID</TableHeadCell>
              <TableHeadCell>DURUM</TableHeadCell>
              <TableHeadCell>BAŞLANGIÇ TARİHİ</TableHeadCell>
              <TableHeadCell>BİTİŞ TARİHİ</TableHeadCell>
              <TableHeadCell>NOTLAR</TableHeadCell>
              <TableHeadCell>OLUŞTURMA TARİHİ</TableHeadCell>
              <TableHeadCell>SON GÜNCELLENME</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((v) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{v.id}</TableCell>
                    <TableCell>{v.clinicId}</TableCell>
                    <TableCell>{v.doctorId}</TableCell>
                    <TableCell>{v.patientId}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                      <AppointmentStatusSelect appointmentId={v.id} statusCode={v.appointmentStatus} />
                    </TableCell>
                    <TableCell>
                      {new Date(v.startTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {v.finishTime
                        ? new Date(v.finishTime).toLocaleString()
                        : null}
                    </TableCell>
                    <TableCell className="flex flex-col gap-2">
                      <AppointmentNotesUpdate appointmentId={v.id} notes={v.notes} />
                    </TableCell>
                    <TableCell>
                      {new Date(v.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(v.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  );
}
