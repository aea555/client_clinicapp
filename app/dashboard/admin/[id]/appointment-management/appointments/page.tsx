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
import { MdEdit } from "react-icons/md";

export default function AppointmentsManagementAdminView() {
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
          <h5 className="text-lg font-semibold">Randevular</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>KLİNİK ID</TableHeadCell>
              <TableHeadCell>DOKTOR ID</TableHeadCell>
              <TableHeadCell>HASTA ID</TableHeadCell>
              <TableHeadCell>DURUM</TableHeadCell>
              <TableHeadCell>BAŞLANGIÇ</TableHeadCell>
              <TableHeadCell>BİTİŞ</TableHeadCell>
              <TableHeadCell>NOTLAR</TableHeadCell>
              <TableHeadCell>VERSİYON</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <TextInput value={"AKTİF"} />
                </TableCell>
                <TableCell>26.08.2024 10:30</TableCell>
                <TableCell>
                  <TextInput value={"26.08.2024 10:37"} />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>1</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <TextInput value={"AKTİF"} />
                </TableCell>
                <TableCell>26.08.2024 10:30</TableCell>
                <TableCell>
                  <TextInput value={"26.08.2024 10:37"} />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>1</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <TextInput value={"AKTİF"} />
                </TableCell>
                <TableCell>26.08.2024 10:30</TableCell>
                <TableCell>
                  <TextInput value={"26.08.2024 10:37"} />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>1</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <TextInput value={"AKTİF"} />
                </TableCell>
                <TableCell>26.08.2024 10:30</TableCell>
                <TableCell>
                  <TextInput value={"26.08.2024 10:37"} />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>1</TableCell>
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
