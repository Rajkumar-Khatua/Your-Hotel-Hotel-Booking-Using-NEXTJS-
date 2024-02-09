"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import HeartButton from "../HeartButton";
import Button from "../Button";

import useCountries from "@/app/hooks/useCountries";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
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
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
              duration-300
              
            "
            src={data.imageSrc}
            alt={data.title}
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
          {location?.label} , {location?.region}
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
