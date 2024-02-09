"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValues } = useCountries();
  const location = getByValues(locationValue);

  return (
    <>
      <Heading
        center
        title={title}
        subtitle={`${location?.label}, ${location?.region}`}
      />
      <div
        className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative
      "
      >
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full hover:scale-110 transition duration-300"
        />
        <div
          className="
            absolute
            top-5
            right-5
            "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
