import { View, Image, StyleSheet } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  flexContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  flexItemA: {
    flexDirection: "column",
    alignSelf: "center",
    padding: 10,
  },
  flexItemB: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flexItemAAndLogo: {
    flexDirection: "row",
  },
  flexItemC: {
    flexDirection: "column",
    alignItems: "center",
  },
  language: {
    backgroundColor: "blue",
    color: "white",
    textAlign: "center",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  description: {
    marginEnd: 50,
  },
  name: {
    marginBottom: 9,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemAAndLogo}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.flexItemA}>
          <Text style={styles.name} fontWeight="bold">
            {item.fullName}
          </Text>
          <Text style={styles.description} color="textGrey">
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.flexItemB}>
        <View style={styles.flexItemC}>
          <Text fontWeight="bold">{item.stargazersCount}</Text>
          <Text color="textGrey">Stars</Text>
        </View>
        <View style={styles.flexItemC}>
          <Text fontWeight="bold">{item.forksCount}</Text>
          <Text color="textGrey">Forks</Text>
        </View>
        <View style={styles.flexItemC}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text color="textGrey">Reviews</Text>
        </View>
        <View style={styles.flexItemC}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textGrey">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
