"use client";

import { Button, Dropdown, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import React, { Suspense, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function AppointmentPageDoctor() {
  const [prescription, setPrescription] = useState<string[]>([]);
  const [test, setTest] = useState<string[]>([]);

  function onPressDropdown(val: string) {
    if (!prescription.includes(val)) {
      setPrescription([...prescription, val]);
    }
  }

  function onPressDelete(val: string) {
    if (prescription.includes(val)) {
      setPrescription([...prescription.filter((p) => p !== val)]);
    }
  }

  function onPressTest(val: string) {
    if (!test.includes(val)) {
      setTest([...test, val]);
    }
  }

  function onPressDeleteTest(val: string) {
    if (test.includes(val)) {
      setTest([...test.filter((p) => p !== val)]);
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
    <div className="p-6">
      <div className="flex flex-col gap-6 rounded-lg bg-white p-6">
        <div id="first-row" className="flex flex-row">
          <div id="first-col-of-row-recete" className="basis-1/2 p-1">
            <div className="rounded-t-md bg-content2 p-3">
              <h5 className="text-lg font-medium">Reçete</h5>
              <Dropdown label="İlaç Ekle" inline>
                <Dropdown.Item onClick={() => onPressDropdown("Arveles")}>
                  Arveles
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onPressDropdown("Parol")}>
                  Parol
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onPressDropdown("[İlaç İsmi]")}>
                  [İlaç İsmi]
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onPressDropdown("[İlaç İsmi]")}>
                  [İlaç İsmi]
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="flex flex-col gap-3 rounded-b-md border-2 border-content2 bg-white p-3">
              {prescription.map((p) => (
                <div className="flex flex-row justify-between rounded-md p-2 hover:bg-content2">
                  <p className="font-semibold">{p}</p>
                  <FaRegTrashAlt
                    onClick={() => onPressDelete(p)}
                    className="my-auto text-red-600 hover:cursor-pointer hover:opacity-85"
                  />
                </div>
              ))}
            </div>
          </div>
          <div id="second-col-of-row-tahlil" className="basis-1/2 p-1">
            <div className="rounded-t-md bg-content2 p-3">
              <h5 className="text-lg font-medium">Tahlil</h5>
              <Dropdown label="Tahlil Ekle" inline>
                <Dropdown.Item onClick={() => onPressTest("Açlık Glukoz")}>
                  Açlık Glukoz
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onPressTest("TSH")}>
                  TSH
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onPressTest("[İlaç İsmi]")}>
                  [Tahlil İsmi]
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onPressTest("[İlaç İsmi]")}>
                  [Tahlil İsmi]
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="flex flex-col gap-3 rounded-b-md border-2 border-content2 bg-white p-3">
              {test.map((p) => (
                <div className="flex flex-row justify-between rounded-md p-2 hover:bg-content2">
                  <p className="font-semibold">{p}</p>
                  <FaRegTrashAlt
                    onClick={() => onPressDeleteTest(p)}
                    className="my-auto text-red-600 hover:cursor-pointer hover:opacity-85"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="second-row" className="flex flex-row">
          <div id="first-col-of-2ndrow-notlar" className="basis-1/2 p-1">
            <div className="rounded-md bg-content2">
              <h5 className="p-3 text-lg font-medium">Notlar</h5>
              <Textarea className="p-2" placeholder="...Notlar" rows={3} />
            </div>
          </div>
          <div id="second-col-of-2ndrow-" className="basis-1/2 p-1">
            <div className="rounded-md bg-content2">
              <h5 className="p-3 text-lg font-medium">
                Randevunun Önceki Güncellemeleri
              </h5>
              <div className="flex flex-col gap-3 border-2 border-content2 bg-white p-3">
                <p className="rounded-md p-1 hover:cursor-pointer hover:bg-content2">
                  03.09.2024 14:36:45
                </p>
                <p className="rounded-md p-1 hover:cursor-pointer hover:bg-content2">
                  03.09.2024 13:51:31
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="third-row" className="flex flex-row">
          <div id="first-col-of-2ndrow-notlar" className="basis-1/2 p-1">
            <div className="rounded-md bg-content2">
              <h5 className="p-3 text-lg font-medium">
                Tahlil Sonuçları
              </h5>
              <div className="flex flex-col gap-3 border-2 border-content2 bg-white p-3">
                <p className="rounded-md p-1 hover:bg-content2">
                  AÇLIK GLİKOZ - 150 <span className="font-bold">[Y]</span>
                </p>
                <p className="rounded-md p-1 hover:bg-content2">
                  KAN BASINCI (DİASTOLİK) - 150 mm/Hg <span className="font-bold">[Y]</span>
                </p>
                <p className="rounded-md p-1 hover:bg-content2">
                  KAN BASINCI (SİSTOLİK) - 110 mm/Hg <span className="font-bold">[Y]</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-6">
          <Button className="primary">Güncelle</Button>
          <Button className="bg-red-400">Randevuyu Tamamla</Button>
        </div>
      </div>
    </div>
    </Suspense>
  );
}
