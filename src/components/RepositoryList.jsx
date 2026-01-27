/* eslint-disable no-unused-vars */
import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <Text style={styles.emptyText}>Loading...</Text>;
  if (error)
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  if (!repositories) return <Text style={styles.emptyText}>No data found</Text>;

  const repositoryNodes = repositories.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (item ? <RepositoryItem item={item} /> : null)}
    />
  );
};

export default RepositoryList;
