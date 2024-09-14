import {
  List,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaRuler, FaPerson, FaUserDoctor } from "react-icons/fa6";
import { FaWeight } from "react-icons/fa";
import { PiSpeedometerFill } from "react-icons/pi";
import { FaFilePrescription, FaClinicMedical, FaClock } from "react-icons/fa";
import { TbVaccine } from "react-icons/tb";
import { HiBeaker } from "react-icons/hi";
import React, { Suspense } from "react";
import BasicChart from "components/charts/BasicChart";
import { GetAppointmentsOfAccount } from "apicalls/Account/GetAppointmentsOfAccount";
import { mapAppointmentStatusToSpan } from "utils/mapAppointmentStatus";
import { AppointmentsOfAccount } from "types/AppointmentsOfAccount.type";
import Link from "next/link";
import { CustomJwtPayload } from "types/Jwt.type";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import CancelAppointmentButton from "./CancelAppointmentButton";

async function getRelatedData() {
  const res = await GetAppointmentsOfAccount();
  if (res.success) return res.extraData;
  return [];
}

function mostRecentOne(
  entities: AppointmentsOfAccount[] | null | undefined,
): AppointmentsOfAccount | null {
  if (entities) {
    var filtered = entities.filter((v) => v.appointmentStatus === 0);
    const mostRecentObject =
      filtered.length > 0
        ? filtered.reduce((latest, current) => {
            return new Date(current.startTime) > new Date(latest.startTime)
              ? current
              : latest;
          })
        : null;
    return mostRecentObject;
  }

  return null;
}

export default async function PatientPage() {
  const data = await getRelatedData();
  const mostRecent = mostRecentOne(data);

  const token = cookies().get("token");
  const decoded = jwtDecode<CustomJwtPayload>(token?.value || "");
  const userId = decoded.nameid;

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex min-h-screen flex-col justify-between gap-3 p-6">
        <div id="topsection" className="flex flex-row flex-wrap gap-3">
          {/* <div
            id="userstats"
            className="flex flex-col gap-1 rounded-md bg-white p-4"
          >
            <h5 className="font-semibold">İstatistikler</h5>
            <List>
              <List.Item icon={FaRuler}>175 cm</List.Item>
              <List.Item icon={FaWeight}>70 kg</List.Item>
              <List.Item icon={FaPerson}>22 yaş</List.Item>
              <List.Item className="text-red-500" icon={PiSpeedometerFill}>
                BMI: 40 (OBEZ)
              </List.Item>
            </List>
          </div> */}

          {mostRecent && (
            <div className="flex flex-col gap-1 rounded-md bg-white p-4">
              <h5 className="font-semibold">Yaklaşan Randevu</h5>

              <List>
                <List.Item icon={FaUserDoctor}>
                  Dr. {mostRecent.firstName} {mostRecent.lastName}
                </List.Item>
                <List.Item icon={FaClinicMedical}>{mostRecent.name}</List.Item>
                <List.Item icon={FaClock}>
                  {new Date(mostRecent.startTime).toLocaleString()}
                </List.Item>
                <CancelAppointmentButton appointmentId={mostRecent.id} />
              </List>
            </div>
          )}

          {/* <div
            id="somecharts"
            className="flex flex-col gap-1 overflow-x-auto rounded-md bg-white p-4"
          >
            <h5>Kilo Tablosu</h5>
            <BasicChart />
          </div> */}

          <div id="gridmenu" className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <Link
              href={`/dashboard/patient/${userId}/prescriptions`}
              className="flex flex-col rounded-2xl border-5 border-green-600 bg-green-400 p-3 shadow-lg hover:cursor-pointer hover:opacity-85"
            >
              <div className="basis-1/3">
                <h5 className="text-center font-semibold">Reçetelerim</h5>
              </div>
              <div className="basis-2/3 rounded-2xl shadow-2xl">
                <FaFilePrescription
                  className="w-full align-middle text-green-800 opacity-85"
                  size={90}
                />
              </div>
            </Link>
            <Link
              href={`/dashboard/patient/${userId}/injections`}
              className="flex flex-col rounded-2xl border-5 border-blue-600 bg-blue-400 p-3 shadow-lg hover:cursor-pointer hover:opacity-85"
            >
              <div className="basis-1/3">
                <h5 className="text-center font-semibold">Enjeksiyonlarım</h5>
              </div>
              <div className="basis-2/3 rounded-2xl shadow-2xl">
                <TbVaccine
                  className="w-full align-middle text-blue-800 opacity-85"
                  size={90}
                />
              </div>
            </Link>
            <Link
              href={`/dashboard/patient/${userId}/testresults`}
              className="flex flex-col rounded-2xl border-5 border-red-600 bg-red-400 p-3 shadow-lg hover:cursor-pointer hover:opacity-85"
            >
              <div className="basis-1/3">
                <h5 className="text-center font-semibold">Tahlil Sonuçlarım</h5>
              </div>
              <div className="basis-2/3 rounded-2xl shadow-2xl">
                <HiBeaker
                  className="w-full align-middle text-red-800 opacity-85"
                  size={90}
                />
              </div>
            </Link>
            <Link
              href={`/dashboard/patient/${userId}/get-an-appointment`}
              className="flex flex-col rounded-2xl border-5 border-yellow-600 bg-yellow-400 p-3 shadow-lg hover:cursor-pointer hover:opacity-85"
            >
              <div className="basis-1/3">
                <h5 className="text-center font-semibold">Randevu Al</h5>
              </div>
              <div className="basis-2/3 rounded-2xl shadow-2xl">
                <FaUserDoctor
                  className="w-full align-middle text-yellow-800 opacity-85"
                  size={90}
                />
              </div>
            </Link>
          </div>
        </div>

        <div
          id="appointments"
          className="flex flex-1 flex-col gap-3 overflow-x-auto"
        >
          {data && data.length > 0 ? (
            <>
              <h5 className="text-lg font-semibold">Randevularım</h5>
              <Table hoverable>
                <TableHead>
                  <TableHeadCell>KLİNİK ADI</TableHeadCell>
                  <TableHeadCell>DOKTOR ADI</TableHeadCell>
                  <TableHeadCell>OLUŞTURMA TARİHİ</TableHeadCell>
                  <TableHeadCell>DURUM</TableHeadCell>
                  <TableHeadCell>RANDEVU TARİHİ</TableHeadCell>
                  <TableHeadCell>RANDEVU BİTİŞ TARİHİ</TableHeadCell>
                  <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {data.map((v) => {
                    return (
                      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {v.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {v.firstName} {v.lastName}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {new Date(v.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {mapAppointmentStatusToSpan(v.appointmentStatus)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {new Date(v.startTime).toLocaleString()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {v.finishTime &&
                            new Date(v?.finishTime).toLocaleString()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {v.appointmentStatus === 0 && (
                            <CancelAppointmentButton appointmentId={v.id} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ) : (
            <h5 className="text-lg font-semibold">
              Randevu geçmişiniz bulunmamaktadır.
            </h5>
          )}
        </div>
      </div>
    </Suspense>
  );
}
