"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Input,
} from "@nextui-org/react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function LoginForm() {
  const [submitFail, setSubmitFail] = React.useState<boolean>(false);
  const [submitOkay, setSubmitOkay] = React.useState<boolean>(false);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const authSchema = z.object({
    email: z.string().email({ message: "Geçerli bir email giriniz." }),
    password: z.string()
  });

  const router = useRouter();

  type Schema = z.infer<typeof authSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(authSchema) });

  async function onSubmit(schemaData: Schema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: schemaData.email,
          password: schemaData.password
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitOkay(true);
        console.log("Login successful");
        router.replace("/dashboard")
      } else {
        console.log(
          "Email confirm failed",
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
        <Button type="submit" isProcessing={isProcessing} disabled={isProcessing}>
          Gönder
        </Button>
        <div>
          <Link href="/auth/register">Kayıt olmak için tıklayın.</Link>
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
