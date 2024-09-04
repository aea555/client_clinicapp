"use client";

import React, { Suspense, useEffect } from "react";
import RoleRequestForm from "./RoleRequestForm";
import { SignupRequestsResult } from "types/RoleSignupRequest.type";
import { GetRequestOfAccount } from "apicalls/Account/GetRequestsOfAccount";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Spinner, Table, TableBody } from "flowbite-react";

export default function NonePage() {
  const [reqs, setReqs] = React.useState<SignupRequestsResult | null>();

  function matchRequestStatus(status: number): string {
    switch (status) {
      case 0:
        return "Kabul Aşamasında";
      case 1:
        return "Kabul Edilmiş";
      default:
        return "";
    }
  }

  async function getReqs() {
    const res = await GetRequestOfAccount();
    if (res.success) {
      setReqs(res.data);
      console.log("Info fetched succesfully", res.data);
    } else {
      console.error("Error: ", res.statusCode);
    }
  }

  useEffect(() => {
    getReqs();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex min-h-screen w-full flex-col p-6">
        <div className="w-full p-4">
          {reqs?.biochemistSignupRequest || reqs?.doctorSignupRequest ? (
            <div>
              {reqs?.doctorSignupRequest ? (
                <div className="w-1/2">
                  <p className="p-4">Mevcut Başvurular</p>
                  <Accordion variant="splitted">
                    <AccordionItem
                      className="bg-foreground-800"
                      key="1"
                      aria-label="Accordion 1"
                      title={matchRequestStatus(
                        reqs.doctorSignupRequest.signUpRequest,
                      )}
                    >
                      <Table>
                        <Table.Head>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">TÜR</p>
                          </Table.HeadCell>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">AD</p>
                          </Table.HeadCell>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">SOYAD</p>
                          </Table.HeadCell>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">TARİH</p>
                          </Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">DOKTOR</p>
                            </Table.Cell>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">
                                {reqs.doctorSignupRequest.firstName}
                              </p>
                            </Table.Cell>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">
                                {reqs.doctorSignupRequest.lastName}
                              </p>
                            </Table.Cell>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">
                                {new Date(
                                  reqs.doctorSignupRequest.submissionDate,
                                ).toLocaleString()}
                              </p>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </AccordionItem>
                  </Accordion>
                </div>
              ) : (
                <div>
                  <p className="p-4">Mevcut Başvurular</p>
                  <Accordion variant="splitted">
                    <AccordionItem
                      className="bg-foreground-800"
                      key="1"
                      aria-label="Accordion 1"
                      title={matchRequestStatus(
                        reqs.biochemistSignupRequest.signUpRequest,
                      )}
                    >
                      <Table className="w-1/2">
                        <Table.Head>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">TÜR</p>
                          </Table.HeadCell>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">AD</p>
                          </Table.HeadCell>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">SOYAD</p>
                          </Table.HeadCell>
                          <Table.HeadCell className="bg-foreground-800">
                            <p className="text-foreground-50">TARİH</p>
                          </Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">BİYOKİMYAGER</p>
                            </Table.Cell>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">
                                {reqs.biochemistSignupRequest.firstName}
                              </p>
                            </Table.Cell>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">
                                {reqs.biochemistSignupRequest.lastName}
                              </p>
                            </Table.Cell>
                            <Table.Cell className="bg-foreground-800">
                              <p className="text-foreground-50">
                                {new Date(
                                  reqs.biochemistSignupRequest.submissionDate,
                                ).toLocaleString()}
                              </p>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="p-4">
                Henüz hesabınıza ait bir kullanıcı profili yok. Hasta, doktor
                veya biyokimyager olarak kayıt açın.
              </p>
              <p className="p-4">
                Hasta kaydı açmanız durumunda sistemden otomatik çıkış yapılacak
                ve yeniden girişiniz istenecek.
              </p>
              <RoleRequestForm />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
