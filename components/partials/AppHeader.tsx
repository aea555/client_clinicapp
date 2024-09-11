import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { BsHospital } from "react-icons/bs";

export default function AppHeader() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/dashboard">
        <BsHospital className="mr-3 h-6 sm:h-9"/>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/dashboard">
          Dashboard
        </NavbarLink>
        <NavbarLink href={`/profile`}>Profil</NavbarLink>
        {/* <NavbarLink href="/preferences">Tercihler</NavbarLink> */}
        <NavbarLink className="text-red-800" href="/logout">Çıkış Yap</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
