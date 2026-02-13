import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { ME } from "../graphql/queries";
import { useQuery, useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
  },
  scroll: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: "bold",
    color: theme.colors.textSecondary,
  },
  spacer: {
    flex: 1,
  },
});

const useMe = () => {
  const { data } = useQuery(ME);
  return { me: data?.me };
};

const Me = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { me } = useMe();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  if (me) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Link to="/myReviews">
          <Text style={styles.linkText}>My reviews</Text>
        </Link>
        <Pressable onPress={signOut}>
          <Text style={styles.linkText}>Sign Out</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Link to="/signIn">
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
        <Link to="/signUp">
          <Text style={styles.linkText}>Sign Up</Text>
        </Link>
      </View>
    );
  }
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        <Link to="/">
          <Text style={styles.linkText}>Repositories</Text>
        </Link>
        <Link to="/reviewform">
          <Text style={styles.linkText}>Create a review</Text>
        </Link>
        {/* Spacer pushes Me links to the right */}
        <View style={styles.spacer} />
        <Me />
      </ScrollView>
    </View>
  );
};

export default AppBar;
