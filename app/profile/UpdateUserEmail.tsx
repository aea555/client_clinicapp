"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { HiExclamation, HiOutlineExclamationCircle } from "react-icons/hi";
import { z } from "zod";

interface Props {
  accountId: number;
}

export default function UpdateUserEmail({ accountId }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");

  const updateSchema = z.object({
    emailconfirm: z
      .string({
        message: "Mevcut email boş bırakılamaz!",
      })
      .email({
        message: "Mevcut email doğru formatta olmalı!",
      }),
    email: z
      .string({
        message: "Yeni email boş bırakılamaz!",
      })
      .email({
        message: "Yeni email doğru formatta olmalı!",
      }),
  });

  type UpdateSchema = z.infer<typeof updateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors: errorPut },
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  async function onSubmit(schemaData: UpdateSchema) {
    setIsProcessing(true);
    try {
      const confirmRes = await fetch("/api/account/confirmemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId,
          email: schemaData.emailconfirm,
        }),
      });

      const dataConfirm = await confirmRes.json();
      if (dataConfirm.success) {
        console.log("Email confirm successful");
        const res = await fetch("/api/account/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: accountId,
            email: schemaData.email,
          }),
        });

        const data = await res.json();

        if (data.success) {
          console.log("Account update successful");
          window.location.reload();
        } else {
          console.log("Account update failed", data.error || "Unknown error");
          setFailMsg("Beklenmedik bir hata! Sayfayı yenileyip tekrar deneyin.");
        }
      } else {
        console.log(
          "Email confirm failed",
          dataConfirm.error || "Unknown error",
          setFailMsg("Mevcut emailinizi yanlış girdiniz!"),
        );
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
      className="flex flex-col flex-wrap gap-3 p-3 shadow-2xl drop-shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h5 className="text-lg font-bold">Email Güncelleme</h5>
      <div className="mb-2 block">
        <Label htmlFor="emailconfirm" value="Mevcut Emailiniz" />
        <TextInput id="emailconfirm" {...register("emailconfirm")} />
      </div>
      <div className="mb-2 block">
        <Label htmlFor="emailnew" value="Yeni Emailiniz" />
        <TextInput id="emailnew" {...register("email")} />
      </div>
      <Button onClick={() => setOpenModal(true)}>Gönder</Button>

      {errorPut.emailconfirm?.message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {errorPut.emailconfirm?.message}
          </div>
          <Toast.Toggle />
        </Toast>
      )}

      {errorPut.email?.message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {errorPut.email?.message}
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
                  handleSubmit(onSubmit)();
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
