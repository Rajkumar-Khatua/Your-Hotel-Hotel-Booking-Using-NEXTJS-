import { getCurrentUser } from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClientOnly from "./FavoritesClientOnly";

const FavoritesPage = async () => {
  const favorites = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Oops! You don't have any favorites yet"
          subtitle="Looks like you haven't added any properties to your favorites yet. Go ahead and find your dream property and add it to your favorites."
          showRest
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClientOnly favorites={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
