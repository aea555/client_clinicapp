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

  const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$";
  const registerSchema = z.object({
    email: z.string().email({ message: "Geçerli bir email giriniz." }),
    password: z.string().regex(RegExp(regex), {
      message: "Şifre gereksinimlerini karşılamıyor.",
    }),
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: schemaData.email,
          passwordHash: schemaData.password,
          gender: Number(schemaData.gender),
          birthDate: schemaData.birthDate
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitOkay(true);
        console.log("Signup successful");
        router.replace("/auth/login")
      } else {
        console.log(
          "Signup failed",
          data.error || "Unknown error",
        );
        setSubmitFail(true)
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
          {errors.email?.message && <p>{String(errors.email.message)}</p>}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="Password"
            {...register("password")}
          />
          {errors.password?.message && <p>{String(errors.password.message)}</p>}
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
