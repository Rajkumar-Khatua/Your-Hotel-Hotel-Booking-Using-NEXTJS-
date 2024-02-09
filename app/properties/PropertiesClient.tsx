"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property has been deleted successfully.");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.error || "Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        center
        title="Your Properties"
        subtitle="List of properties you have hosted. Click on a property to view its details."
      />
      <div
        className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
        "
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            disabled={deletingId === listing.id}
            actionLabel="Delete My Property"
            currentUser={currentUser}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
