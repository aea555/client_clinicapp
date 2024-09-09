import { GetPrescriptionsOfAccount } from "apicalls/Account/GetPrescriptionsOfAccount";
import { GetTestResultsOfAccount } from "apicalls/Account/GetTestResultsOfAccount";
import { Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React, { Suspense } from "react";
import { mapResultFlagToSpan } from "utils/mapResultFlagToString";

async function getRelatedData() {
  const res = await GetTestResultsOfAccount();
  if (res.success) return res.extraData;
  return [];
}

export default async function TestResultsPatientView() {
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
          <h5 className="text-lg font-semibold">Tahlil Sonuçları</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>TAHLİL ADI</TableHeadCell>
              <TableHeadCell>SONUÇ DEĞERİ</TableHeadCell>
              <TableHeadCell>SONUÇ TARİHİ</TableHeadCell>
              <TableHeadCell>NORMALİTE</TableHeadCell>
              <TableHeadCell>BİYOKİMYAGER ADI</TableHeadCell>
              <TableHeadCell>DOKTOR ADI</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((v) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.value} {v.unitType}</TableCell>
                    <TableCell>{new Date(v.resultDate).toLocaleString()}</TableCell>
                    <TableCell>{mapResultFlagToSpan(v.resultFlag)}</TableCell>
                    <TableCell>{v.biochemistFirstName} {v.biochemistLastName}</TableCell>
                    <TableCell>{v.doctorFirstName} {v.doctorLastName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  )
}
