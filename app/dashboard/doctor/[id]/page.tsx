"use client";

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
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense } from "react";

export default function DoctorPage() {
  const router = useRouter();
  const pathname = usePathname();

  async function onPress() {
    const newRoute = `${pathname}/appointment/1`;
    router.replace(newRoute);
  }

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
          <h5 className="text-lg font-semibold">Devam Eden Randevular</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>HASTA ADI</TableHeadCell>
              <TableHeadCell>HASTA SOYADI</TableHeadCell>
              <TableHeadCell>TARİH</TableHeadCell>
              <TableHeadCell>SAAT</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>AHMET EMRE</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:30</TableCell>
                <TableCell>
                  <Button onClick={onPress} className="mx-auto bg-yellow-500">
                    Ekranı Aç
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>MEHMET EREN</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:20</TableCell>
                <TableCell>
                  <Button className="mx-auto bg-yellow-500">Ekranı Aç</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>AHMET</TableCell>
                <TableCell>YILMAZ</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:10</TableCell>
                <TableCell>
                  <Button className="mx-auto bg-yellow-500">Ekranı Aç</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>MEHMET</TableCell>
                <TableCell>KAYA</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:00</TableCell>
                <TableCell>
                  <Button className="mx-auto bg-yellow-500">Ekranı Aç</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-x-auto">
          <h5 className="text-lg font-semibold">Sıradaki Randevular</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>HASTA ADI</TableHeadCell>
              <TableHeadCell>HASTA SOYADI</TableHeadCell>
              <TableHeadCell>TARİH</TableHeadCell>
              <TableHeadCell>SAAT</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>AHMET EMRE</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:30</TableCell>
                <TableCell>
                  <Button onClick={onPress} className="mx-auto bg-primary-500">
                    Ekranı Aç
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>MEHMET EREN</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:20</TableCell>
                <TableCell>
                  <Button className="mx-auto bg-primary-500">Ekranı Aç</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>AHMET</TableCell>
                <TableCell>YILMAZ</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:10</TableCell>
                <TableCell>
                  <Button className="mx-auto bg-primary-500">Ekranı Aç</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>MEHMET</TableCell>
                <TableCell>KAYA</TableCell>
                <TableCell>16/09/2024</TableCell>
                <TableCell>10:00</TableCell>
                <TableCell>
                  <Button className="mx-auto bg-primary-500">Ekranı Aç</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div></div>
      </div>
    </Suspense>
  );
}
