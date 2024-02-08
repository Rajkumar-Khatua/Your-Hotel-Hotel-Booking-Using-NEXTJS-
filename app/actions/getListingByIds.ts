import { SafeUser } from "../types";
import prisma from "@/app/libs/prismaDB";

interface IGetListingByIs {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default async function getListingByIds(params: IGetListingByIs) {
  try {
    const { listingId, currentUser } = params;

    if (!listingId) {
      throw new Error("Listing ID is required");
    }

    if (!currentUser) {
      throw new Error("User is required");
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString(),
      },
    };
  } catch (error) {
    throw new Error(String(error));
  }
}
