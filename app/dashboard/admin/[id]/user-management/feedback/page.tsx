import { GetAllFeedbacks } from "apicalls/Feedback/GetAllFeedbacks";
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
import FeedbackRemoveButton from "./FeedbackRemoveButton";

async function getRelatedData() {
  const res = await GetAllFeedbacks();
  if (res.success) return res.data;
  return [];
}

export default async function FeedbacksManagementAdminView() {
  const data = await getRelatedData();

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
              {data?.map((v) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{v.id}</TableCell>
                    <TableCell>{v.patientId}</TableCell>
                    <TableCell>{v.doctorId}</TableCell>
                    <TableCell>{v.appointmentId}</TableCell>
                    <TableCell>
                      {new Date(v.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{v.rating}</TableCell>
                    <TableCell>
                      <Textarea disabled rows={3} className="p-3" defaultValue={v?.comment} />
                    </TableCell>
                    <TableCell>
                      {v.isDeleted ? (
                        <span className="font-bold text-red-600">
                          KALDIRILDI
                        </span>
                      ) : (
                        <span className="font-bold text-green-600">
                          GÖRÜNÜR
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <FeedbackRemoveButton feedbackId={v.id}/>
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
