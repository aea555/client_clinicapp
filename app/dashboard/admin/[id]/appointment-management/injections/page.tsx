import { GetAllInjections } from "apicalls/Injection/GetAllInjections";
import {
  Button,
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
import InjectionFieldUpdate from "./InjectionFieldUpdate";

async function getRelatedData() {
  const res = await GetAllInjections();
  if (res.success) return res.data;
  return [];
}

export default async function InjectionsManagementAdminView() {
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
          <h5 className="text-lg font-semibold">Enjeksiyonlar</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>HASTA ID</TableHeadCell>
              <TableHeadCell>DOKTOR ID</TableHeadCell>
              <TableHeadCell>İLAÇ ID</TableHeadCell>
              <TableHeadCell>TARİH</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((v) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{v.id}</TableCell>
                    <TableCell>
                      <InjectionFieldUpdate id={v.id} patientId={v.patientId.toString()} />
                    </TableCell>
                    <TableCell><InjectionFieldUpdate id={v.id} doctorId={v.doctorId.toString()} /></TableCell>
                    <TableCell><InjectionFieldUpdate id={v.id} drugId={v.drugId.toString()} /></TableCell>
                    <TableCell>{v.createdAt}</TableCell>
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
