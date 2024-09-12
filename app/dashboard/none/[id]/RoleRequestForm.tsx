"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Alert, Button, Modal, Spinner, Toast } from "flowbite-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyValuePair } from "types/RoleKeyValuePairs.type";
import { z } from "zod";
import {
  HiExclamation,
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RoleRequestForm() {
  const [submitOkay, setSubmitOkay] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [statuscode, setStatuscode] = useState("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [failMsg, setFailMsg] = useState<string>("");

  const router = useRouter();

  const roles: KeyValuePair[] = [
    { key: "doctor", label: "Doktor" },
    { key: "biochemist", label: "Biyokimyager" },
    { key: "patient", label: "Hasta" },
  ];

  const requestSchema = z.object({
    Role: z.string({
      message: "Rol boş bırakılamaz!",
    }),
    FirstName: z
      .string({
        message: "Ad boş bırakılamaz!",
      })
      .min(1, {
        message: "Ad boş bırakılamaz!",
      })
      .max(75, {
        message: "Maksimum uzunluk 75 karakterdir!",
      }),
    LastName: z
      .string({
        message: "Soyad boş bırakılamaz!",
      })
      .min(1, {
        message: "Soyad boş bırakılamaz!",
      })
      .max(75, {
        message: "Maksimum uzunluk 75 karakterdir!",
      }),
  });

  type Schema = z.infer<typeof requestSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(requestSchema) });

  async function onSubmitPost(schemaData: Schema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/roleRequest/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: schemaData.Role,
          firstName: schemaData.FirstName,
          lastName: schemaData.LastName,
        }),
      });

      if (schemaData.Role !== "patient") {
        const data = await res.json();

        if (data.success) {
          console.log("Role request create successful");
          window.location.reload();
        } else {
          console.log(
            "Role request create failed",
            data.error || "Unknown error",
          );
          setAlertOpen(true);
          setStatuscode(data?.statusCode.toString());
        }
      } else {
        router.replace("/logout");
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
      <form
        id="roleRequestForm"
        className="flex w-1/2 flex-col gap-4 p-4"
        onSubmit={handleSubmit(onSubmitPost)}
      >
        <div>
          <Select
            className="bg-background"
            label="Profil türü"
            {...register("Role")}
          >
            {roles.map((v) => (
              <SelectItem key={v.key}>{v.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Input
            id="firstName"
            type="text"
            label="Ad"
            placeholder=""
            {...register("FirstName")}
          />
        </div>
        <div>
          <Input
            id="lastName"
            type="text"
            label="Soyad"
            {...register("LastName")}
          />
        </div>
        <Button onClick={() => setOpenModal(true)}>Gönder</Button>
        {errors.FirstName?.message && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {errors.FirstName?.message}
            </div>
            <Toast.Toggle />
          </Toast>
        )}

        {errors.LastName?.message && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {errors.LastName?.message}
            </div>
            <Toast.Toggle />
          </Toast>
        )}

        {errors.Role?.message && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {errors.Role?.message}
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
        {alertOpen ? (
          <div>
            <Alert
              color="failure"
              className="bg-danger-foreground"
              icon={HiInformationCircle}
              onDismiss={() => setAlertOpen(false)}
            >
              <span className="block font-medium">Kod: {statuscode}</span>
              <span className="block font-medium">İstek başarısız!</span>
              <span className="block font-medium">
                Kontrol edip tekrar deneyin.
              </span>
            </Alert>
          </div>
        ) : null}
        {submitOkay ? (
          <Alert color="success">
            <span className="font-medium">İşlem Başarılı! </span>
            Lütfen sayfanız yüklenirken bekleyin...
          </Alert>
        ) : null}
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
                    handleSubmit(onSubmitPost)();
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
    </Suspense>
  );
}
