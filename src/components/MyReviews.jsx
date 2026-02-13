import useMe from "../hooks/useMe";
import Text from "./Text";
import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useQuery, useMutation } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams, useLocation } from "react-router-native";
import { format } from "date-fns";
import { DELETE_REVIEW } from "../graphql/queries";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  showButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    margin: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    margin: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  reviewItem: { flexDirection: "row", paddingVertical: 10 },
  rating: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "blue",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  ratingText: {
    color: "blue",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  info: { flex: 1, paddingVertical: 5, paddingRight: 10 },
  username: { fontWeight: "bold", fontSize: 16, marginBottom: 2 },
  created: { fontSize: 14, color: "grey", marginBottom: 5 },
  textBox: {},
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItemWithButtons = ({ item }) => {
  const { state } = useLocation();

  const {
    data,
    loading: repoLoading,
    error: repoError,
  } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: item.repository.id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository || state?.repository;
  const navigate = useNavigate();
  const created = format(new Date(item.createdAt), "dd.MM.yyyy");

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  });

  const handleDelete = async () => {
    try {
      await deleteReview({
        variables: { deleteReviewId: item.id },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: handleDelete },
      ],
    );
  };

  return (
    <View>
      <View style={styles.reviewItem}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.username}>
            {item.repository.ownerName}/{item.repository.name}
          </Text>
          <Text style={styles.created}>{created}</Text>
          <Text style={styles.textBox}>{item.text}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={() =>
            navigate(`/repositories/${repository.id}`, {
              state: { repository: repository },
            })
          }
          style={styles.showButton}
        >
          <Text
            fontWeight="bold"
            style={{ color: "white", padding: 10, textAlign: "center" }}
          >
            View repository
          </Text>
        </Pressable>
        <Pressable onPress={createTwoButtonAlert} style={styles.deleteButton}>
          <Text
            fontWeight="bold"
            style={{ color: "white", padding: 10, textAlign: "center" }}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const include = true;
  const { reviews, loading, error } = useMe(include);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!reviews) return <Text>No reviews found</Text>;
  const reviewNodes = reviews.map((edge) => edge.node);
  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItemWithButtons item={item} />}
    />
  );
};

export default MyReviews;
