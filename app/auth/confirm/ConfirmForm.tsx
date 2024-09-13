"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@nextui-org/react";
import { Button, Label, Toast } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiExclamation, HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function ConfirmForm() {
  const [submitFail, setSubmitFail] = React.useState<boolean>(false);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$";
  const registerSchema = z.object({
    password: z.string().regex(RegExp(regex), {
      message: "Şifre gereksinimlerini karşılamıyor.",
    }),
    code: z.string({
      message: "Boş bırakılamaz!",
    }),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const gender = searchParams.get("gender");
  const birthDate = searchParams.get("birthDate");

  React.useEffect(() => {
    if (!email) {
      router.replace("/auth/register");
    }
  }, [email]);

  type Schema = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(registerSchema) });

  async function handleConfirm(schemaData: Schema) {
    setIsProcessing(true);
    setSubmitFail(false);

    try {
      const res = await fetch("/api/auth/confirmcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: schemaData.code }),
      });

      const data = await res.json();
      if (data.success) {
        const signupRes = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            passwordHash: schemaData.password,
            birthDate,
            gender: Number(gender),
          }),
        });

        const signupData = await signupRes.json();
        if (signupData.success) {
          router.replace("/auth/login");
        } else {
          setSubmitFail(true);
        }
      } else {
        setSubmitFail(true);
        console.error("confirmation failed")
        console.log(data.data)
      }
    } catch (error) {
      setSubmitFail(true);
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleConfirm)}
      className="flex flex-col flex-wrap gap-3 p-3 shadow-2xl drop-shadow-2xl"
    >
      <div className="mb-2 block">
        <Label htmlFor="code" value="Doğrulama Kodu" />
        <Input
          id="code"
          type="text"
          {...register("code")}
          placeholder="Enter confirmation code"
        />
      </div>

      <div className="mb-2 block">
        <Label htmlFor="password" value="Şifrenizi Girin." />

        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Create your password"
        />
      </div>

      <Button type="submit" isProcessing={isProcessing} disabled={isProcessing}>
        Gönder
      </Button>

      {submitFail && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          onDismiss={() => setSubmitFail(false)}
        >
          <span className="font-medium">İşlem Başarısız! </span>
          Lütfen tekrar deneyin.
        </Alert>
      )}

      {errors.code?.message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {errors.code?.message}
          </div>
          <Toast.Toggle />
        </Toast>
      )}
    </form>
  );
}
