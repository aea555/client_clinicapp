import { GetAllRequests } from "apicalls/RoleRequest/GetAllRequests";
import RequestStatusSetButtons from "components/partials/RequestStatusSetButtons";
import {
  Button,
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
  const res = await GetAllRequests("1");
  if (res.success)
    return res.data?.filter((r) => !r.isDeleted && r.signUpRequest === 0);
  return [];
}

export default async function RoleRequestBiochemistAdminView() {
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
          <h5 className="text-lg font-semibold">Başvurular</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>HESAP ID</TableHeadCell>
              <TableHeadCell>AD</TableHeadCell>
              <TableHeadCell>SOYAD</TableHeadCell>
              <TableHeadCell>DURUM</TableHeadCell>
              <TableHeadCell>BAŞVURU ID</TableHeadCell>
              <TableHeadCell>OLUŞTURMA TARİHİ</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((d) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{d.accountId}</TableCell>
                    <TableCell>{d.firstName}</TableCell>
                    <TableCell>{d.lastName}</TableCell>
                    <TableCell>ONAY BEKLİYOR</TableCell>
                    <TableCell>{d.id}</TableCell>
                    <TableCell>
                      {new Date(d.createdAt).toLocaleDateString()}
                    </TableCell>
                    <RequestStatusSetButtons
                      requestId={d.id}
                      role="biochemist" 
                    />
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
