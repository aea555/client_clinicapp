"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dropdown,
  Modal,
  Spinner,
  TextInput,
  Toast,
} from "flowbite-react";
import React, { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiExclamation, HiOutlineExclamationCircle } from "react-icons/hi";
import { Drug } from "types/Drug.type";
import { Prescription } from "types/Prescription.type";
import { ServiceResult } from "types/ServiceResult";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

interface Props {
  appointmentId: number;
  patientId: number;
  doctorId: number;
}

export default function AddPrescription({
  appointmentId,
  patientId,
  doctorId,
}: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [drugs, setDrugs] = React.useState<Drug[]>([]);
  const [selectedDrugs, setSelectedDrugs] = React.useState<Drug[] | null>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [failMsg, setFailMsg] = React.useState<string>("");

  useEffect(() => {
    fetchStuff();
  }, []);

  async function fetchStuff() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/drug/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: {
        success: boolean;
        data: ServiceResult<Drug[]>;
        error: string | undefined | null;
      } = await res.json();

      if (data.success && data.data.data) {
        console.log("Fetch successful");
        setDrugs(data.data.data);
      } else {
        console.log("Fetch failed", data.data.errorMessage || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function createPrescription(schemaData: Schema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/prescription/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          patientId,
          doctorId,
          durationDays: schemaData.durationDays,
        }),
      });

      const data: {
        success: boolean;
        data: ServiceResult<Prescription>;
        error: string | undefined | null;
      } = await res.json();

      if (data.success && data.data.data) {
        console.log("create successful");
        selectedDrugs?.forEach(async (d) => {
          const res = await fetch("/api/prescriptiondrug/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prescriptionId: data.data.data?.id,
              drugId: d.id,
            }),
          });
          const resData: {
            success: boolean;
            error: string | undefined | null;
          } = await res.json();
          if (resData.success) {
            console.log("create prescriptiondrug successful");
          } else {
            console.error("create prescription drug failed.");
            setFailMsg(
              "Beklenmedik bir hata! Sayfayı yenileyip tekrar deneyin.",
            );
          }
        });
        window.location.reload();
      } else {
        console.log("create failed", data.error || "Unknown error");
        setFailMsg("Beklenmedik bir hata! Sayfayı yenileyip tekrar deneyin.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  function handleClick(drug: Drug) {
    if (selectedDrugs && !selectedDrugs?.includes(drug)) {
      setSelectedDrugs([...selectedDrugs, drug]);
    }
  }

  function handleDelete(drug: Drug) {
    if (selectedDrugs && selectedDrugs.includes(drug)) {
      setSelectedDrugs(selectedDrugs.filter((d) => d !== drug));
    }
  }

  const schema = z.object({
    durationDays: z
      .number({
        message: "Reçete süresi numara olmalıdır.",
      })
      .min(1, {
        message: "Reçete süresi boş bırakılamaz!",
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

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex flex-col flex-wrap gap-3 p-3 shadow-2xl drop-shadow-2xl">
        <div className="rounded-t-md bg-content2 p-3">
          <h5 className="text-lg font-medium">Reçete</h5>
          <Dropdown label="İlaç Ekle" inline>
            {drugs &&
              drugs.length > 0 &&
              drugs.map((v) => {
                return (
                  <Dropdown.Item
                    className="hover:cursor-pointer"
                    value={v.name}
                    onClick={() => handleClick(v)}
                    key={uuidv4()}
                  >
                    {v.name}
                  </Dropdown.Item>
                );
              })}
          </Dropdown>
        </div>
        <div className="-mt-3 flex flex-col gap-3 rounded-b-md border-2 border-content2 bg-white p-3">
          {selectedDrugs &&
            selectedDrugs.length > 0 &&
            selectedDrugs.map((v) => (
              <div
                key={uuidv4()}
                className="flex flex-row justify-between rounded-md p-2 hover:bg-content2"
              >
                <p className="font-semibold">{v.name}</p>
                <FaRegTrashAlt
                  onClick={() => handleDelete(v)}
                  className="my-auto text-red-600 hover:cursor-pointer hover:opacity-85"
                />
              </div>
            ))}
        </div>
        <form
          className="mt-3 flex flex-col flex-wrap gap-3"
          onSubmit={handleSubmit(createPrescription)}
        >
          <div className="md:w-1/2">
            <h5>Reçete Süresi</h5>
            <TextInput
              {...register("durationDays", { valueAsNumber: true })}
              type="number"
              className="mt-1"
            />
          </div>

          <Button
            isProcessing={isProcessing}
            disabled={isProcessing}
            onClick={() => setOpenModal(true)}
            className="mt-3"
          >
            Reçete Oluştur
          </Button>

          {postErrors.durationDays?.message && (
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiExclamation className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                {postErrors.durationDays?.message}
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
                      handleSubmit(createPrescription)();
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
      </div>
    </Suspense>
  );
}
