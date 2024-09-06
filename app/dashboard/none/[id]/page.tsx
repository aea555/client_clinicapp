import React, { Suspense, useEffect } from "react";
import { GetRequestOfAccount } from "apicalls/Account/GetRequestsOfAccount";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import RoleRequestForm from "./RoleRequestForm";

async function getRelatedData() {
  const res = await GetRequestOfAccount();
  if (res.success && res.data) {
    const { biochemistSignupRequest, doctorSignupRequest } = res.data;
    return {biochemistSignupRequest, doctorSignupRequest};
  }
  if (res.success && !res.data)
    return null;

  return null;
}

export default async function NonePage() {
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
          {(data && (data?.biochemistSignupRequest || data?.doctorSignupRequest)) && (
            <>
              <h5 className="text-lg font-semibold">Mevcut Başvurular</h5>
              <Table hoverable>
                <TableHead>
                  <TableHeadCell>AD</TableHeadCell>
                  <TableHeadCell>SOYAD</TableHeadCell>
                  <TableHeadCell>OLUŞTURMA TARİHİ</TableHeadCell>
                  <TableHeadCell>ROL</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {data?.doctorSignupRequest && (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>
                        {data.doctorSignupRequest.firstName}
                      </TableCell>
                      <TableCell>{data.doctorSignupRequest.lastName}</TableCell>
                      <TableCell>
                        {new Date(
                          data.doctorSignupRequest.createdAt,
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>DOKTOR</TableCell>
                    </TableRow>
                  )}
                  {data?.biochemistSignupRequest && (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>
                        {data.biochemistSignupRequest.firstName}
                      </TableCell>
                      <TableCell>
                        {data.biochemistSignupRequest.lastName}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          data.biochemistSignupRequest.createdAt,
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>BİYOKİMYAGER</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <span className="text-lg font-bold">Lütfen başvurunuz onaylanana kadar bekleyin.</span>
            </>
          )}
          {(!data?.biochemistSignupRequest && !data?.doctorSignupRequest) && (
            <div>
              <p className="p-4">
                Henüz hesabınıza ait bir kullanıcı profili yok. Hasta, doktor
                veya biyokimyager olarak kayıt açın.
              </p>
              <p className="p-4">
                Hasta kaydı açmanız durumunda sistemden otomatik çıkış yapılacak
                ve yeniden girişiniz istenecek.
              </p>
              <RoleRequestForm />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
