"use client";

import { Button, Modal, NavbarLink } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function SignOutButton() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <NavbarLink
        onClick={() => setOpenModal(true)}
        className="text-red-800"
        href="#"
      >
        Çıkış Yap
      </NavbarLink>
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
              Çıkış yapmak istediğinize emin misiniz?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false);
                  router.replace("/logout");
                }}
              >
                {"Evet"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Hayır, iptal et.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
