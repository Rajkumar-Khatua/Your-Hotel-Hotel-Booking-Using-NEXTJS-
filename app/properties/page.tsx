import { getCurrentUser } from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage = async () => {
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

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Looks Like no properties are available for you."
          subtitle="Host a property to get started"
        />

      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient 
        listings={listings}
        currentUser={currentUser} 
        
        />
    </ClientOnly>
  );
};

export default PropertiesPage;
