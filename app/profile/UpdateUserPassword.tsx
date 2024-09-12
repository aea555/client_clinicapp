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

export default function UpdateUserPassword({ accountId }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");

  const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$";
  const updateSchema = z.object({
    passwordConfirm: z
      .string({
        message: "Mevcut şifre boş bırakılamaz!",
      })
      .min(1, {
        message: "Mevcut şifre boş bırakılamaz!",
      }),
    passwordNew: z.string().regex(RegExp(regex), {
      message:
        "Şifre gereksinimleri karşılamıyor. 6-20 karakter arasında, en az bir adet numara, birer adet büyük ve küçük harf içeren şifreler kabul edilir.",
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
      const confirmRes = await fetch("/api/account/confirmpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId,
          password: schemaData.passwordConfirm,
        }),
      });

      const dataConfirm = await confirmRes.json();
      if (dataConfirm.success) {
        console.log("Password confirm successful");
        const res = await fetch("/api/account/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: accountId,
            passwordHash: schemaData.passwordNew,
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
          "Password confirm failed",
          dataConfirm.error || "Unknown error",
        );
        setFailMsg("Mevcut şifrenizi yanlış girdiniz!");
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
      <h5 className="text-lg font-bold">Şifre Güncelleme</h5>
      <div className="mb-2 block">
        <Label htmlFor="passwordconfirm" value="Mevcut Şifreniz" />
        <TextInput
          type="password"
          id="passwordconfirm"
          {...register("passwordConfirm")}
        />
      </div>
      <div className="mb-2 block">
        <Label htmlFor="passwordnew" value="Yeni Şifreniz" />
        <TextInput
          type="password"
          id="passwordnew"
          {...register("passwordNew")}
        />
      </div>
      <Button onClick={() => setOpenModal(true)}>Gönder</Button>
      {errorPut.passwordConfirm?.message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {errorPut.passwordConfirm?.message}
          </div>
          <Toast.Toggle />
        </Toast>
      )}

      {errorPut.passwordNew?.message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {errorPut.passwordNew?.message}
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
              <Button disabled={isProcessing} color="gray" onClick={() => setOpenModal(false)}>
                Hayır, iptal et.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </form>
  );
}
