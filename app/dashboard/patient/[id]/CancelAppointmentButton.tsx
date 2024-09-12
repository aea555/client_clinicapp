"use client";

import { Button, Modal, Toast } from "flowbite-react";
import React from "react";
import { HiExclamation, HiOutlineExclamationCircle } from "react-icons/hi";

interface Props {
  appointmentId: number;
}

export default function CancelAppointmentButton({ appointmentId }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");

  async function handlePress() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/cancel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId, status: 2 }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Appointment cancel successful");
        window.location.reload();
      } else {
        console.log("Appointment cancel failed", data.error || "Unknown error");
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
    <>
      {failMsg && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{failMsg}</div>
          <Toast.Toggle />
        </Toast>
      )}
      <Button onClick={() => setOpenModal(true)} className="bg-red-400">
        İPTAL ET
      </Button>
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
                isProcessing={isProcessing}
                disabled={isProcessing}
                onClick={handlePress}
              >
                {"Evet"}
              </Button>
              <Button disabled={isProcessing} color="gray" onClick={() => setOpenModal(false)}>
                Hayır, iptal et.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
