"use client";
import Image from "next/image";
interface AvatarProps {
  src: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div>
      <Image
        className="rounded-full
            "
        height="30"
        width="30"
        objectFit="cover"
        alt="avatar"
        src={src || "/images/Avatar.jpg"}
      />
    </div>
  );
};

export default Avatar;
