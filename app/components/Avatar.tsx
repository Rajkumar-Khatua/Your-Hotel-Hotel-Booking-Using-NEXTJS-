"use client";
import Image from "next/image";

const Avatar = () => {
  return (
    <div>
      <Image
        className="rounded-full
            "
        height="30"
        width="30"
        objectFit="cover"
        alt="avatar"
        src="/images/Avatar.jpg"
      />
    </div>
  );
};

export default Avatar;
