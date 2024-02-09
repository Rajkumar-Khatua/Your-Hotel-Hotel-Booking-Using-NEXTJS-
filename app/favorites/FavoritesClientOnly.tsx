import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientOnlyProps {
  currentUser?: SafeUser | null;
  favorites: SafeListing[] | [];
}
const FavoritesClientOnly: React.FC<FavoritesClientOnlyProps> = ({
  currentUser,
  favorites,
}) => {
  return (
    <Container>
      <Heading
        center
        title="Your Favorites List"
        subtitle="Here are the properties you've added to your favorites list."
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
        {favorites.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClientOnly;
