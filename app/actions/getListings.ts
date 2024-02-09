import prisma from "@/app/libs/prismaDB";
export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = params;

    let query: any = {};
    // Check if userId is provided and return listings for that user
    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => {
      return {
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      };
    });

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
