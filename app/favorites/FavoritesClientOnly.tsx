import ClientOnly from "../components/ClientOnly";
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
        title="Your Favorites List"
        subtitle="Here are the properties you've added to your favorites list.
                     This list is only available to you.
                      You can add or remove properties from your
                       favorites list at any time. 
                       You can also share your favorites list with your friends and family.
                        Happy house hunting! 🏡"
      />
      <div
        className="
                gird
                mt-10
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                3xl:grid-cols-7
                gap-8
      "
      >
        {favorites.map((listing) => (
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
