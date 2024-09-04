"use client";

import {
  List,
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
import React from "react";
import BasicChart from "components/charts/BasicChart";

export default function PatientPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between gap-5 p-6">
      <div id="topsection" className="flex flex-row flex-wrap gap-5">
        <div
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
        </div>

        <div
          id="userstats"
          className="flex flex-col gap-1 rounded-md bg-white p-4"
        >
          <h5 className="font-semibold">Yaklaşan Randevu</h5>
          <List>
            <List.Item icon={FaUserDoctor}>Dr. AYŞE FATMA</List.Item>
            <List.Item icon={FaClinicMedical}>Bursa Nilüfer Sağlık Ocağı</List.Item>
            <List.Item icon={FaClock}>10:30</List.Item>
          </List>
        </div>

        <div
          id="somecharts"
          className="flex flex-col gap-1 overflow-x-auto rounded-md bg-white p-4"
        >
          <h5>Kilo Tablosu</h5>
          <BasicChart />
        </div>

        <div id="gridmenu" className="grid grid-cols-2 gap-3">
          <div className="flex flex-col hover:opacity-85 hover:cursor-pointer rounded-2xl bg-green-400 p-3 border-5 border-green-600 shadow-lg">
            <div className="basis-1/3">
              <h5 className="text-center font-semibold">Reçetelerim</h5>
            </div>
            <div className="basis-2/3 shadow-2xl rounded-2xl">
              <FaFilePrescription className="w-full align-middle" size={50} />
            </div>
          </div>
          <div className="flex flex-col hover:opacity-85 hover:cursor-pointer rounded-2xl bg-blue-400 p-3 border-5 border-blue-600 shadow-lg">
            <div className="basis-1/3">
              <h5 className="text-center font-semibold">Enjeksiyonlarım</h5>
            </div>
            <div className="basis-2/3 shadow-2xl rounded-2xl">
              <TbVaccine className="w-full align-middle" size={50} />
            </div>
          </div>
          <div className="flex flex-col hover:opacity-85 hover:cursor-pointer rounded-2xl bg-red-400 p-3 border-5 border-red-600 shadow-lg">
            <div className="basis-1/3">
              <h5 className="text-center font-semibold">Tahlil Sonuçlarım</h5>
            </div>
            <div className="basis-2/3 shadow-2xl rounded-2xl">
              <HiBeaker className="w-full align-middle" size={50} />
            </div>
          </div>
          <div className="flex flex-col hover:opacity-85 hover:cursor-pointer rounded-2xl bg-yellow-400 p-3 border-5 border-yellow-600 shadow-lg">
            <div className="basis-1/3">
              <h5 className="text-center font-semibold">Randevu Al</h5>
            </div>
            <div className="basis-2/3 shadow-2xl rounded-2xl">
              <FaUserDoctor className="w-full align-middle" size={50} />
            </div>
          </div>
        </div>
      </div>

      <div
        id="appointments"
        className="flex flex-1 flex-col gap-3 overflow-x-auto"
      >
        <h5 className="text-lg font-semibold">Randevularım</h5>
        <Table hoverable>
          <TableHead>
            <TableHeadCell>KLİNİK</TableHeadCell>
            <TableHeadCell>DOKTOR</TableHeadCell>
            <TableHeadCell>DURUM</TableHeadCell>
            <TableHeadCell>TARİH</TableHeadCell>
            <TableHeadCell>SAAT</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>AYŞE FATMA</TableCell>
              <TableCell>AKTİF</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>10:30</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>AHMET YILMAZ</TableCell>
              <TableCell>İPTAL</TableCell>
              <TableCell>11/09/2024</TableCell>
              <TableCell>12:45</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>MEHMET YILDIZ</TableCell>
              <TableCell>TAMAMLANDI</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>09:15</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>MEHMET YILDIZ</TableCell>
              <TableCell>TAMAMLANDI</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>09:15</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>MEHMET YILDIZ</TableCell>
              <TableCell>TAMAMLANDI</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>09:15</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>MEHMET YILDIZ</TableCell>
              <TableCell>TAMAMLANDI</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>09:15</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>MEHMET YILDIZ</TableCell>
              <TableCell>TAMAMLANDI</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>09:15</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>MEHMET YILDIZ</TableCell>
              <TableCell>TAMAMLANDI</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>09:15</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Bursa Nilüfer Sağlık Ocağı
              </TableCell>
              <TableCell>MEHMET YILDIZ</TableCell>
              <TableCell>TAMAMLANDI</TableCell>
              <TableCell>16/09/2024</TableCell>
              <TableCell>09:15</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
