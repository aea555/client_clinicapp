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

export default function TestsManagementAdminView() {
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
          <h5 className="text-lg font-semibold">Tahliller</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>RANDEVU ID</TableHeadCell>
              <TableHeadCell>TAHLİL ID</TableHeadCell>
              <TableHeadCell>BİYOKİMYAGER ID</TableHeadCell>
              <TableHeadCell>TAHLİL ADI</TableHeadCell>
              <TableHeadCell>SONUÇ TARİHİ</TableHeadCell>
              <TableHeadCell>SONUÇ</TableHeadCell>
              <TableHeadCell>NORMALİTE</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
                <TableCell>AÇLIK GLUKOZ</TableCell>
                <TableCell>26.08.2024 10:30</TableCell>
                <TableCell>
                  <TextInput value={75} />
                </TableCell>
                <TableCell>
                  <TextInput value={"NORMAL"} />
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
                <TableCell>AÇLIK GLUKOZ</TableCell>
                <TableCell>24.08.2024 14:47</TableCell>
                <TableCell>
                  <TextInput value={120} />
                </TableCell>

                <TableCell>
                  <TextInput value={"YÜKSEK"} />
                </TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Button className="bg-red-400">SİL</Button>{" "}
                  <Button>GÜNCELLE</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>7</TableCell>
                <TableCell>4</TableCell>
                <TableCell>AÇLIK GLUKOZ</TableCell>
                <TableCell>31.08.2024 18:34</TableCell>
                <TableCell>
                  <TextInput value={40} />
                </TableCell>
                <TableCell>
                  <TextInput value={"DÜŞÜK"} />
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
