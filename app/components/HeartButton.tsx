"use client";

import { SafeUser } from "../types";
import { PiHeartFill, PiHeartThin } from "react-icons/pi";

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId,
}) => {
  const hasFavorite = true;
  const toggleFavorite = () => {};
  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
    "
    >
      <PiHeartThin
        className="fill-white absolute -top-[2px] -right-[2px]"
        size={28}
      />
      <PiHeartFill
        size={24}
        className={
          hasFavorite ? "fill-rose-500 " : "fill-neutral-100/50"
        }
      />
    </div>
  );
};

export default HeartButton;
