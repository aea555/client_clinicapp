import { Button, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Textarea, TextInput } from 'flowbite-react'
import React, { Suspense } from 'react'

export default function UsersManagementsAdminView() {
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
              <TableHeadCell>ROL</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell><TextInput value={"akarahmet2002@gmail.com"} /></TableCell>
                <TableCell>ERKEK</TableCell>
                <TableCell><TextInput value={"05/05/2002"} /></TableCell>
                <TableCell>
                  <TextInput value={"ADMIN"} />
                </TableCell>
                <TableCell className="flex flex-col gap-3">
                  <Button>GÜNCELLE</Button>
                  <Button className="bg-red-400">SİL</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell><TextInput value={"akarahmet2002@gmail.com"} /></TableCell>
                <TableCell>ERKEK</TableCell>
                <TableCell><TextInput value={"05/05/2002"} /></TableCell>
                <TableCell>
                  <TextInput value={"ADMIN"} />
                </TableCell>
                <TableCell className="flex flex-col gap-3">
                  <Button>GÜNCELLE</Button>
                  <Button className="bg-red-400">SİL</Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell><TextInput value={"akarahmet2002@gmail.com"} /></TableCell>
                <TableCell>ERKEK</TableCell>
                <TableCell><TextInput value={"05/05/2002"} /></TableCell>
                <TableCell>
                  <TextInput value={"ADMIN"} />
                </TableCell>
                <TableCell className="flex flex-col gap-3">
                  <Button>GÜNCELLE</Button>
                  <Button className="bg-red-400">SİL</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  )
}
