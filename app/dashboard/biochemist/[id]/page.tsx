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

export default function BiochemistPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex min-h-screen flex-col gap-5 p-6">
        <h3 className="font-bold">Bekleyen Tahlil İstekleri</h3>
        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>RANDEVU ID</TableHeadCell>
              <TableHeadCell>TEST ADI</TableHeadCell>
              <TableHeadCell>BİRİM</TableHeadCell>
              <TableHeadCell>ALT ARALIK</TableHeadCell>
              <TableHeadCell>ÜST ARALIK</TableHeadCell>
              <TableHeadCell>SONUÇ GİR</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>AÇLIK GLUKOZU</TableCell>
                <TableCell>mg/dL</TableCell>
                <TableCell>70</TableCell>
                <TableCell>100</TableCell>
                <TableCell>
                  <TextInput type="text" sizing="sm" />
                </TableCell>
                <TableCell>
                  <Button>Gönder</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>HEMOGLOBİN</TableCell>
                <TableCell>g/dL</TableCell>
                <TableCell>13.2</TableCell>
                <TableCell>16.6</TableCell>
                <TableCell>
                  <TextInput type="text" sizing="sm" />
                </TableCell>
                <TableCell>
                  <Button>Gönder</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>HEMATOKRİT</TableCell>
                <TableCell>%</TableCell>
                <TableCell>35</TableCell>
                <TableCell>50</TableCell>
                <TableCell>
                  <TextInput type="text" sizing="sm" />
                </TableCell>
                <TableCell>
                  <Button>Gönder</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>WBC</TableCell>
                <TableCell>milyar/L</TableCell>
                <TableCell>3.4</TableCell>
                <TableCell>9.6</TableCell>
                <TableCell>
                  <TextInput type="text" sizing="sm" />
                </TableCell>
                <TableCell>
                  <Button>Gönder</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  );
}
