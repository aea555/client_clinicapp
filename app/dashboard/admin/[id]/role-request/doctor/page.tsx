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

export default function RoleRequestDoctorAdminView() {
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
              <TableHeadCell>TARİH</TableHeadCell>
              <TableHeadCell></TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>AHMET EMRE</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>03.09.2024 16:45</TableCell>
                <TableCell>
                  <Button className="bg-green-400">ONAYLA</Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-red-400">REDDET</Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>AHMET EMRE</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>03.09.2024 16:45</TableCell>
                <TableCell>
                  <Button className="bg-green-400">ONAYLA</Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-red-400">REDDET</Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>AHMET EMRE</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>03.09.2024 16:45</TableCell>
                <TableCell>
                  <Button className="bg-green-400">ONAYLA</Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-red-400">REDDET</Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>AHMET EMRE</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>03.09.2024 16:45</TableCell>
                <TableCell>
                  <Button className="bg-green-400">ONAYLA</Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-red-400">REDDET</Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>AHMET EMRE</TableCell>
                <TableCell>AKAR</TableCell>
                <TableCell>03.09.2024 16:45</TableCell>
                <TableCell>
                  <Button className="bg-green-400">ONAYLA</Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-red-400">REDDET</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  );
}
