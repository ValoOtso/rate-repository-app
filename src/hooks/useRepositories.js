import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { se } from "date-fns/locale";

const useRepositories = (order, orderDirection, searchKeyword) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderDirection: orderDirection,
      orderBy: order,
      searchKeyword: searchKeyword,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data?.repositories,
    loading,
    error,
  };
};

export default useRepositories;
