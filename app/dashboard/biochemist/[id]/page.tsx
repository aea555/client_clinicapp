import { GetPendingAppointmentTests } from "apicalls/AppointmentTest/GetPendingAppointmentTests";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React, { Suspense } from "react";
import SendResults from "./SendResults";

async function getRelatedData() {
  const res = await GetPendingAppointmentTests();
  if (res.success) return res.data;
  return [];
}

export default async function BiochemistPage() {
  const data = await getRelatedData();

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex min-h-screen flex-col gap-5 p-6">
        <h3 className="font-bold">Bekleyen Tahlil İstekleri</h3>
        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>OLUŞTURMA TARİHİ</TableHeadCell>
              <TableHeadCell>RANDEVU ID</TableHeadCell>
              <TableHeadCell>TEST ADI</TableHeadCell>
              <TableHeadCell>BİRİM</TableHeadCell>
              <TableHeadCell>KADIN ALT LİMİT</TableHeadCell>
              <TableHeadCell>KADIN ÜST LİMİT</TableHeadCell>
              <TableHeadCell>ERKEK ALT LİMİT</TableHeadCell>
              <TableHeadCell>ERKEK ÜST LİMİT</TableHeadCell>
              <TableHeadCell>SONUÇ GİR</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data &&
                data.map((v) => {
                  return (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>
                        {new Date(v.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{v.appointmentId}</TableCell>
                      <TableCell>{v.test?.name}</TableCell>
                      <TableCell>{v.test?.unitType}</TableCell>
                      <TableCell>{v.test?.rangeStartFemale}</TableCell>
                      <TableCell>{v.test?.rangeEndFemale}</TableCell>
                      <TableCell>{v.test?.rangeStartMale}</TableCell>
                      <TableCell>{v.test?.rangeEndMale}</TableCell>
                      <TableCell>
                        <SendResults appointmentTestId={v.id} rangeEnd={v.test?.rangeEndMale} rangeStart={v.test?.rangeStartMale}/>
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
