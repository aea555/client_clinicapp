"use client";

import { Button, List, Modal, Spinner } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { PossibleAppointment } from "types/PossibleAppointment.type";

interface Props {
  appointment: PossibleAppointment;
}

export default function AppointmentCard({ appointment }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");
  const router = useRouter();

  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const id = pathSegments[3];

  async function handlePress() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/createwithaccountid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinicId: appointment.clinicId,
          doctorId: appointment.doctorId,
          accountId: id,
          startTime: appointment.startTime,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Appointment CREATE successful");
        window.location.reload();
      } else {
        console.log(
          "Appointment CREATE failed",
        );
        setFailMsg("Beklenmedik bir hata! Sayfayı yenileyip tekrar deneyin.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setFailMsg("Beklenmedik bir hata! Sayfayı yenileyip tekrar deneyin.");
    } finally {
      setIsProcessing(false);
    }
  }
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex flex-col gap-5 rounded-xl bg-white p-3">
        <List.Item icon={FaUserDoctor}>
          <p className="font-bold">
            {appointment.doctorFirstName} {appointment.doctorLastName}
          </p>
        </List.Item>
        <Button onClick={() => setOpenModal(true)}>
          Randevu Al
        </Button>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Devam etmek istediğinize emin misiniz?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={async () => {
                  await handlePress();
                  setOpenModal(false);
                }}
                isProcessing={isProcessing}
                disabled={isProcessing}
              >
                {"Evet"}
              </Button>
              <Button
                disabled={isProcessing}
                color="gray"
                onClick={() => setOpenModal(false)}
              >
                Hayır, iptal et.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Suspense>
  );
}
