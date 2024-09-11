import { GetUpcomingAppointments } from "apicalls/Appointment/GetUpcomingAppointments";
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
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";
import { CustomJwtPayload } from "types/Jwt.type";

async function getRelatedData(id: number) {
  const res = await GetUpcomingAppointments(id);
  if (res.success) return res.extraData;
  return [];
}

export default async function DoctorPage() {
  const token = cookies().get("token");
  const decoded = jwtDecode<CustomJwtPayload>(token?.value || "");
  const userId = decoded.nameid;
  const data = await getRelatedData(Number(userId));

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
          <h5 className="text-lg font-semibold">Sıradaki Randevular</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>RANDEVU ID</TableHeadCell>
              <TableHeadCell>HASTA ADI</TableHeadCell>
              <TableHeadCell>HASTA SOYADI</TableHeadCell>
              <TableHeadCell>TARİH</TableHeadCell>
              <TableHeadCell>SAAT</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data &&
                data.map((v) => {
                  return (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>{v.id}</TableCell>
                      <TableCell>{v.firstName}</TableCell>
                      <TableCell>{v.lastName}</TableCell>
                      <TableCell>
                        {new Date(v.startTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(v.startTime).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <Button>
                          <Link href={`/dashboard/doctor/${userId}/appointment/${v.id}`}>
                            Ekrana Git
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div></div>
      </div>
    </Suspense>
  );
}
