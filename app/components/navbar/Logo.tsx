"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      src="/images/logo.png"
      alt="Your Hotel"
      width={50}
      height={50}
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
