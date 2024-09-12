"use client";

import { Button, Modal, Toast } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";
import { HiExclamation, HiOutlineExclamationCircle } from "react-icons/hi";

interface Props {
  appointmentId: number;
}

export default function PatientAbsent({ appointmentId }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");
  const router = useRouter();

  async function completeAppointment() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          status: 3,
        }),
      });

      const data: {
        success: boolean;
        error: string | undefined | null;
      } = await res.json();

      if (data.success) {
        console.log("update successful");
        router.replace("/dashboard");
      } else {
        console.log("update failed", data.error || "Unknown error");
        setFailMsg("Beklenmedik bir hata! Sayfayı yenileyip tekrar deneyin.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setFailMsg("Beklenmedik bir hata! Sayfayı yenileyip tekrar deneyin.");
    } finally {
      setIsProcessing(false);
      setOpenModal(false);
    }
  }

  return (
    <div className="flex flex-row gap-6">
      <Button
        isProcessing={isProcessing}
        disabled={isProcessing}
        onClick={() => setOpenModal(true)}
        className="bg-yellow-400"
      >
        Hasta Gelmedi
      </Button>
      {failMsg && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{failMsg}</div>
          <Toast.Toggle />
        </Toast>
      )}
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
                onClick={completeAppointment}
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
    </div>
  );
}
