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

export default function InjectionsManagementAdminView() {
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
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>
                  <TextInput value={7} />
                </TableCell>
                <TableCell>
                  <TextInput value={4} />
                </TableCell>
                <TableCell>
                  <TextInput value={15} />
                </TableCell>
                <TableCell>
                  <TextInput value={"26.08.2024 10:30"} />
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>
                  <TextInput value={7} />
                </TableCell>
                <TableCell>
                  <TextInput value={4} />
                </TableCell>
                <TableCell>
                  <TextInput value={15} />
                </TableCell>
                <TableCell>
                  <TextInput value={"26.08.2024 10:30"} />
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>
                  <TextInput value={7} />
                </TableCell>
                <TableCell>
                  <TextInput value={4} />
                </TableCell>
                <TableCell>
                  <TextInput value={15} />
                </TableCell>
                <TableCell>
                  <TextInput value={"26.08.2024 10:30"} />
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  );
}
