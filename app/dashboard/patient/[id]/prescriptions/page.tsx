import { GetPrescriptionsOfAccount } from "apicalls/Account/GetPrescriptionsOfAccount";
import { Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React, { Suspense } from "react";

async function getRelatedData() {
  const res = await GetPrescriptionsOfAccount();
  if (res.success) return res.extraData;
  return [];
}

export default async function PrescriptionsPatientView() {
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
          <h5 className="text-lg font-semibold">Reçeteler</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>OLUŞTURMA TARİHİ</TableHeadCell>
              <TableHeadCell>İLAÇ ADI</TableHeadCell>
              <TableHeadCell>REÇETE SÜRESİ (GÜN)</TableHeadCell>
              <TableHeadCell>REÇETE BİTİŞ</TableHeadCell>
              <TableHeadCell>DOKTOR ADI</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((v) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{new Date(v.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.durationDays}</TableCell>
                    <TableCell>{new Date(new Date(v.createdAt).setDate(new Date(v.createdAt).getDate() + 30)).toLocaleDateString()}</TableCell>
                    <TableCell>{v.firstName} {v.lastName}</TableCell>
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
