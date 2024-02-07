"use client";

import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import useCountries from "@/app/hooks/useCountries";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const { getByValues } = useCountries();
  const location = getByValues(data.locationValue);

  console.log(location?.label);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
              col-span-1
              cursor-pointer
              group
  "
    >
      <div className="flex flex-col gap-2 w-full transition">
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
        "
        >
          <Image
            fill
            src={data.imageSrc}
            alt={data.title}
            layout="fill"
            objectFit="cover"
            className="object-cover
                       h-full w-full
                       group-hover:scale-110
                       translate-x-1 transition-transform 
                       duration-300 ease-in-out"
          />
          <div
            className="
                  absolute 
                  top-3 
                  right-3"
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.label} , {location?.region} , {location?.flag}
        </div>
        <div
          className="
          font-light text-neutral-500
        "
        >
          {reservationDate || data.category}
        </div>
        <div
          className="
          flex flex-row items-center gap-1
        "
        >
          <div className="font-semibold">${price}</div>
          {!reservation && (
            <div
              className="
              font-light text-neutral-500
            "
            >
              / night
            </div>
          )}
        </div>
        {onAction && (
          <Button
            disabled={disabled}
            small
            label={actionLabel || "Cancel"}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
