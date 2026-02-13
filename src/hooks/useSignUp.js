import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/queries";

const UseSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });
    return data.signUp;
  };
  return [signUp, result];
};

export default UseSignUp;
