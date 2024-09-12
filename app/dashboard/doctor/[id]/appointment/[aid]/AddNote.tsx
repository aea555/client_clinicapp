"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Textarea, Toast } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { HiExclamation, HiOutlineExclamationCircle } from "react-icons/hi";
import { z } from "zod";

interface Props {
  appointmentId: number;
  existingNotes?: string | null;
}

export default function AddNote({ existingNotes, appointmentId }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");

  const schema = z.object({
    notes: z
      .string({
        message: "Not doğru formatta olmalı!",
      })
      .max(500, {
        message: "Maksimum 500 karakter olmalı!",
      })
      .optional(),
  });

  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors: postErrors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function updateNotes(schemaData: Schema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          notes: schemaData.notes,
        }),
      });

      const data: {
        success: boolean;
        error: string | undefined | null;
      } = await res.json();

      if (data.success) {
        console.log("update successful");
      } else {
        console.log("update failed", data.error || "Unknown error");
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
    <div
      id="first-col-of-2ndrow-notlar"
      className="flex flex-col flex-wrap gap-3 p-3 shadow-2xl drop-shadow-2xl"
    >
      <form className="rounded-md" onSubmit={handleSubmit(updateNotes)}>
        <h5 className="rounded-t-md bg-content2 p-3 text-lg font-medium">
          Notlar
        </h5>
        <Textarea
          {...register("notes")}
          defaultValue={existingNotes || ""}
          className="rounded-none rounded-b-md p-2"
          placeholder="...Notlar"
          rows={3}
        />
        <Button
          className="mt-2"
          isProcessing={isProcessing}
          disabled={isProcessing}
          onClick={() => setOpenModal(true)}
        >
          Gönder
        </Button>
        {postErrors.notes?.message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {postErrors.notes?.message}
          </div>
          <Toast.Toggle />
        </Toast>
      )}

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
                  onClick={() => {
                    handleSubmit(updateNotes)();
                    setOpenModal(false);
                  }}
                  isProcessing={isProcessing}
                  disabled={isProcessing}
                  type="submit"
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
      </form>
    </div>
  );
}
