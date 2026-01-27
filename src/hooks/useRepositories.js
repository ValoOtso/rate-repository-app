import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  // Logs to confirm the hook runs
  console.log("useRepositories executed:", { data, loading, error });

  return {
    repositories: data?.repositories,
    loading,
    error,
  };
};

export default useRepositories;
