import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMe = (include) => {
  const { data, loading, error } = useQuery(ME, {
    variables: {
      includeReviews: include,
    },
  });

  return { reviews: data?.me?.reviews?.edges ?? [], loading, error };
};

export default useMe;
