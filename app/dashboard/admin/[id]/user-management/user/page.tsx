import { GetAllAccounts } from "apicalls/Account/GetAllAccounts";
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
import UserRoleSelect from "./UserRoleSelect";
import { cookies } from "next/headers";
import { CustomJwtPayload } from "types/Jwt.type";
import { jwtDecode } from "jwt-decode";

async function getRelatedData(userId: string) {
  const res = await GetAllAccounts();
  if (res.success && res.data)
    return res.data.filter((v) => v.id !== Number(userId));
  return [];
}

export default async function UsersManagementsAdminView() {
  const token = cookies().get("token");
  const decoded = jwtDecode<CustomJwtPayload>(token?.value || "");
  const userId = decoded.nameid;

  const data = await getRelatedData(userId);

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
          <h5 className="text-lg font-semibold">Kullanıcılar</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>EMAIL</TableHeadCell>
              <TableHeadCell>CİNSİYET</TableHeadCell>
              <TableHeadCell>DOĞUM TARİHİ</TableHeadCell>
              <TableHeadCell>OLUŞTURMA TARİHİ</TableHeadCell>
              <TableHeadCell>ROL</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data?.map((v) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{v.id}</TableCell>
                    <TableCell>{v.email}</TableCell>
                    <TableCell>{v.gender === 0 ? "ERKEK" : "KADIN"}</TableCell>
                    <TableCell>
                      {new Date(v.birthDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(v.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex flex-col flex-wrap gap-2">
                      <UserRoleSelect accountId={v.id} roleFlag={v.role} />
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
