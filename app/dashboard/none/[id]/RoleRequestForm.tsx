"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Alert, Button, Spinner } from "flowbite-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyValuePair } from "types/RoleKeyValuePairs.type";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RoleRequestForm() {
  const [submitOkay, setSubmitOkay] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [statuscode, setStatuscode] = useState("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  const roles: KeyValuePair[] = [
    { key: "doctor", label: "Doktor" },
    { key: "biochemist", label: "Biyokimyager" },
    { key: "patient", label: "Hasta" },
  ];

  const requestSchema = z.object({
    Role: z.string(),
    FirstName: z.string().min(1).max(75),
    LastName: z.string().min(1).max(75),
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
      }
      else {
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
        <Button
          isProcessing={isProcessing}
          disabled={isProcessing}
          type="submit"
        >
          Gönder
        </Button>
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
      </form>
    </Suspense>
  );
}
