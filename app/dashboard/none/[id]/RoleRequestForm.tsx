"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import CreateRoleRequest from "apicalls/RoleRequest/CreateRoleRequest";
import { useRouter } from "next/navigation";
import { Alert, Spinner } from "flowbite-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyValuePair } from "types/RoleKeyValuePairs.type";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";

export default function RoleRequestForm() {
  const [submitOkay, setSubmitOkay] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [statuscode, setStatuscode] = useState("");

  const roles: KeyValuePair[] = [
    { key: "doctor", label: "Doktor" },
    { key: "biochemist", label: "Biyokimyager" },
    { key: "patient", label: "Hasta" },
  ];

  const router = useRouter();

  const requestSchema = z.object({
    Role: z.string(),
    FirstName: z.string().min(1),
    LastName: z.string().min(1),
  });

  type Schema = z.infer<typeof requestSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(requestSchema) });

  const WatchRole = watch("Role");
  console.log(WatchRole);

  async function onSubmit(data: Schema) {
    try {
      const response = await CreateRoleRequest(
        data.Role,
        data.FirstName,
        data.LastName,
      );
      if (response.success) {
        switch (data.Role) {
          case "doctor":
          case "biochemist":
            setSubmitOkay(true);
            router.replace("/dashboard");
            break;
          case "patient":
            setSubmitOkay(true);
            router.replace("/logout");
            break;
          default:
            break;
        }
      } else setAlertOpen(true);
      setStatuscode(response.statusCode.toString());
    } catch (error) {
      console.error("Unexpected error:", error);
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Select label="Profil türü" {...register("Role")}>
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
          {errors.FirstName?.message && (
            <p>{String(errors.FirstName.message)}</p>
          )}
        </div>
        <div>
          <Input
            id="lastName"
            type="text"
            label="Soyad"
            {...register("LastName")}
          />
          {errors.LastName?.message && <p>{String(errors.LastName.message)}</p>}
        </div>
        <Button type="submit" color="primary" radius="md">
          Submit
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
