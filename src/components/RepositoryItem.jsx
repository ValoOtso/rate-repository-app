import { View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

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
  gitButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    margin: 10,
  },
});

const formatCount = (value) =>
  value >= 1000
    ? `${(value / 1000).toFixed(1).replace(".0", "")}k`
    : String(value);

const RepositoryItem = ({
  item,
  onPress,
  showButton = false,
  onButtonPress,
}) => {
  const content = (
    <View testID="repositoryItem" style={styles.flexContainer}>
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
          <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
          <Text color="textGrey">Stars</Text>
        </View>
        <View style={styles.flexItemC}>
          <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
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
      {showButton && (
        <Pressable style={styles.gitButton} onPress={onButtonPress}>
          <Text
            fontWeight="bold"
            style={{ color: "white", padding: 10, textAlign: "center" }}
          >
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return <Pressable onPress={onPress}>{content}</Pressable>;
};

export default RepositoryItem;
