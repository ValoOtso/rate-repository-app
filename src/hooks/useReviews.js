import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (id, first) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id, first },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first,
      },
    });
  };

  return {
    reviews: data?.repository?.reviews,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useReviews;
