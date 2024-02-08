import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListingByIds from "@/app/actions/getListingByIds";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingByIds(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
