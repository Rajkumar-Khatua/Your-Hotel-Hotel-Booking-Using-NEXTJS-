import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Seems like you're not logged in"
          subtitle="Log in to see your trips."
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Looks like you don't have any trips yet."
          subtitle="Book a trip to see your reservations here."
        />

      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient 
        reservations={reservations}
        currentUser={currentUser} 
        
        />
    </ClientOnly>
  );
};

export default TripsPage;
