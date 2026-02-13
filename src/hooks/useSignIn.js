import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    console.log("signIn called with:", { username, password });
    const { data } = await mutate({
      variables: {
        username,
        password,
      },
    });

    console.log("SIGN IN mutation result:", data);

    const accessToken = data?.authenticate?.accessToken;
    console.log("Access token extracted:", accessToken);

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
      console.log("Token stored in AsyncStorage");
    } else {
      console.log("No token returned from backend");
    }
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
