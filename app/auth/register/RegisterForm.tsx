"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import DatePickerComponent from "components/ui/DatePickerComponent";
import Link from "next/link";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function RegisterForm() {
  const [submitFail, setSubmitFail] = React.useState<boolean>(false);
  const [submitOkay, setSubmitOkay] = React.useState<boolean>(false);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const registerSchema = z.object({
    email: z.string().email({ message: "Geçerli bir email giriniz." }),
    gender: z.string().min(1),
    birthDate: z.string().min(1),
  });

  const router = useRouter();

  type Schema = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(schemaData: Schema) {
    setIsProcessing(true);
    try {  
      const res = await fetch("/api/auth/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: schemaData.email
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/auth/confirm?email=${schemaData.email}&gender=${schemaData.gender}&birthDate=${schemaData.birthDate}`);
      } else {
        setSubmitFail(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setSubmitFail(true);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div>
      <form
        id="authForm"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <div>
          {errors.gender?.message && (
            <p>{String(errors.gender.message) + " GENDER"}</p>
          )}
          {errors.birthDate?.message && (
            <p>{String(errors.birthDate.message)}</p>
          )}
        </div>
        <div>
          <Input
            id="email"
            type="email"
            label="email"
            placeholder="ahmet@clinic.com"
            {...register("email")}
          />
        </div>
        <div>
          <DatePickerComponent {...register("birthDate")} />
        </div>
        <div>
          <Select label="Cinsiyetinizi seçin" {...register("gender")}>
            <SelectItem key={0}>Erkek</SelectItem>
            <SelectItem key={1}>Kadın</SelectItem>
          </Select>
        </div>
        <Button type="submit" isProcessing={isProcessing} disabled={isProcessing}>
          Gönder
        </Button>
        <div>
          <Link href="/auth/login">Giriş yapmak için tıklayın.</Link>
        </div>
        <div>
          {submitFail ? (
            <Alert
              color="failure"
              icon={HiInformationCircle}
              onDismiss={() => setSubmitFail(false)}
            >
              <span className="font-medium">İşlem Başarısız! </span>
              Lütfen tekrar deneyin.
            </Alert>
          ) : null}
          {submitOkay ? (
            <Alert color="success">
              <span className="font-medium">İşlem Başarılı! </span>
              Lütfen sayfanız yüklenirken bekleyin...
            </Alert>
          ) : null}
        </div>
      </form>
    </div>
  );
}
