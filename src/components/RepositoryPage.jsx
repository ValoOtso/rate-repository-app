import { View, FlatList, StyleSheet, Linking } from "react-native";
import { useLocation, useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import useReviews from "../hooks/useReviews";
import { GET_REPOSITORY } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: { height: 10 },
  container: { flex: 1 },
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

const ReviewItem = ({ item }) => {
  const created = format(new Date(item.createdAt), "dd.MM.yyyy");
  return (
    <View style={styles.reviewItem}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.username}>{item.user.username}</Text>
        <Text style={styles.created}>{created}</Text>
        <Text style={styles.textBox}>{item.text}</Text>
      </View>
    </View>
  );
};

const RepositoryPage = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const {
    data,
    loading: repoLoading,
    error: repoError,
  } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository || state?.repository;

  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    fetchMore,
  } = useReviews(id, 1);

  if (repoLoading && !repository) return <Text>Loading repository...</Text>;

  if (repoError)
    return <Text>Error loading repository: {repoError.message}</Text>;

  if (!repository) return <Text>Repository not found</Text>;

  if (reviewsLoading) return <Text>Loading reviews...</Text>;

  if (reviewsError)
    return <Text>Error loading reviews: {reviewsError.message}</Text>;

  const reviewNodes = reviews?.edges?.map((edge) => edge.node) || [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem item={item} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <RepositoryItem
            item={repository}
            showButton
            onButtonPress={() => Linking.openURL(repository.url)}
          />
        )}
      />
    </View>
  );
};

export default RepositoryPage;
