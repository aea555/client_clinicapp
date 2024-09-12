"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextInput, Toast } from "flowbite-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HiExclamation, HiOutlineExclamationCircle } from "react-icons/hi";
import { Schema, z } from "zod";

interface Props {
  appointmentTestId: number;
  rangeStart: number | null | undefined;
  rangeEnd: number | null | undefined;
}

export default function SendResults({
  appointmentTestId,
  rangeStart,
  rangeEnd,
}: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const id = pathSegments[3];

  const schema = z.object({
    value: z
      .number({
        message: "Tahlil sonucu numara türünden olmalıdır!",
      })
      .min(1, {
        message: "Tahlil sonucu boş bırakılamaz!",
      })
      .transform((val) => (val ? Number(val) : null)),
  });

  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors: postErrors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function handlePress(schemaData: Schema) {
    setIsProcessing(true);
    const resultFlag =
      rangeEnd && rangeStart && schemaData.value
        ? schemaData.value > rangeEnd
          ? 2
          : schemaData.value < rangeEnd
            ? 1
            : 0
        : 0;
    try {
      const res = await fetch("/api/testresults/createwithaccountid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentTestId,
          value: schemaData.value,
          accountId: id,
          resultFlag,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Test result create successful");
        window.location.reload();
      } else {
        console.log("Test result create failed", data.error || "Unknown error");
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
    <form
      className="flex flex-col flex-wrap gap-3"
      onSubmit={handleSubmit(handlePress)}
    >
      <TextInput
        {...register("value", { valueAsNumber: true })}
        type="number"
        sizing="sm"
      />
      <Button isProcessing={isProcessing} disabled={isProcessing} onClick={() => setOpenModal(true)}>
        Gönder
      </Button>
      {postErrors.value?.message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {postErrors.value?.message}
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
                  handleSubmit(handlePress)();
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
    </form>
  );
}
