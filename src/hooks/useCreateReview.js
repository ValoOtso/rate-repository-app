import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    console.log("createReview called with:", {
      ownerName,
      repositoryName,
      rating,
      text,
    });

    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      },
    });
    console.log("createReview mutation result: ", data);

    return data.createReview;
  };
  return [createReview, result];
};

export default useCreateReview;
