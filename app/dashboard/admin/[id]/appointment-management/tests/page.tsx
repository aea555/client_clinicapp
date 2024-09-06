import { GetAllAppointmentTestResults } from "apicalls/AppointmentTestResults/GetAllAppointmentTestResults";
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
import ResultFlagUpdate from "./ResultFlagUpdate";
import ResultValueUpdate from "./ResultValueUpdate";

async function getRelatedData() {
  const res = await GetAllAppointmentTestResults();
  if (res.success) return res.data;
  return [];
}

export default async function TestsManagementAdminView() {
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
          <h5 className="text-lg font-semibold">Tahliller</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>RANDEVU ID</TableHeadCell>
              <TableHeadCell>TAHLİL ID</TableHeadCell>
              <TableHeadCell>TAHLİL ADI</TableHeadCell>
              <TableHeadCell>BİYOKİMYAGER ID</TableHeadCell>
              <TableHeadCell>SONUÇ</TableHeadCell>
              <TableHeadCell>SONUÇ TARİHİ</TableHeadCell>
              <TableHeadCell>NORMALİTE</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((v) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{v?.appointmentTest?.appointmentId}</TableCell>
                    <TableCell>{v?.appointmentTest?.testId}</TableCell>
                    <TableCell>{v?.appointmentTest?.test.name}</TableCell>
                    <TableCell>{v.biochemistId}</TableCell>
                    <TableCell className="flex flex-col flex-wrap gap-2">
                      <ResultValueUpdate
                        id={v.id}
                        appointmentTestId={v.appointmentTestId}
                        biochemistId={v.biochemistId}
                        value={v.value.toString()}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(v.resultDate).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex flex-col flex-wrap gap-2">
                      <ResultFlagUpdate
                        id={v.id}
                        biochemistId={v.biochemistId}
                        appointmentTestId={v.appointmentTestId}
                        resultFlag={v.resultFlag}
                      />
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
