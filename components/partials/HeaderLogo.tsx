import Image from "next/image";
import Logo from "../../public/logo.svg";

export default function HeaderLogo() {
  return (
    <Image width={50} src={Logo} alt="appLogo"/>
  )
}
