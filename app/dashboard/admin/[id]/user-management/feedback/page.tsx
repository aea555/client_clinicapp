import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { Suspense } from "react";

export default function FeedbacksManagementAdminView() {
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
          <h5 className="text-lg font-semibold">Yorumlar</h5>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>HASTA ID</TableHeadCell>
              <TableHeadCell>DOKTOR ID</TableHeadCell>
              <TableHeadCell>RANDEVU ID</TableHeadCell>
              <TableHeadCell>TARİH</TableHeadCell>
              <TableHeadCell>PUAN</TableHeadCell>
              <TableHeadCell>YORUM</TableHeadCell>
              <TableHeadCell>DURUM</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>6</TableCell>
                <TableCell>18</TableCell>
                <TableCell>10</TableCell>
                <TableCell>03.09.2024 16:45</TableCell>
                <TableCell>
                  <TextInput value={5} />
                </TableCell>
                <TableCell>
                  <Textarea
                    rows={3}
                    className="p-3"
                    value={
                      "İşini iyi yapan bir doktor, herkese tavsiye ederim."
                    }
                  />
                </TableCell>
                <TableCell>
                  <span className="font-bold text-green-600">GÖRÜNÜR</span>
                </TableCell>
                <TableCell className="flex flex-col gap-3">
                  <Button>GÜNCELLE</Button>
                  <Button className="bg-red-400">KALDIR</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>21</TableCell>
                <TableCell>16</TableCell>
                <TableCell>01.09.2024 10:30</TableCell>
                <TableCell>
                  <TextInput value={4} />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <span className="font-bold text-green-600">GÖRÜNÜR</span>
                </TableCell>
                <TableCell className="flex flex-col gap-3">
                  <Button>GÜNCELLE</Button>
                  <Button className="bg-red-400">KALDIR</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>6</TableCell>
                <TableCell>18</TableCell>
                <TableCell>10</TableCell>
                <TableCell>03.09.2024 16:45</TableCell>
                <TableCell>
                  <TextInput value={1} />
                </TableCell>
                <TableCell>
                  <Textarea
                    rows={3}
                    className="p-3"
                    value={"Lan böyle doktor mu olur a..."}
                  />
                </TableCell>
                <TableCell>
                  <span className="font-bold text-red-600">KALDIRILDI</span>
                </TableCell>
                <TableCell className="flex flex-col gap-3">
                  <Button>GÜNCELLE</Button>
                  <Button className="bg-red-400">KALDIR</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  );
}
