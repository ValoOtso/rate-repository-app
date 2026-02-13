/* eslint-disable no-unused-vars */
import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Button, Menu, PaperProvider, Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [order, setOrder] = useState();
  const [orderDirection, setOrderDirection] = useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const { repositories, loading, error } = useRepositories(
    order,
    orderDirection,
    searchKeyword,
  );
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  if (loading) return <Text style={styles.emptyText}>Loading...</Text>;
  if (error)
    return <Text style={styles.emptyText}>Error: {error.message}</Text>;
  if (!repositories) return <Text style={styles.emptyText}>No data found</Text>;

  const repositoryNodes = repositories.edges.map((edge) => edge.node);
  return (
    <PaperProvider>
      <FlatList
        ListHeaderComponent={
          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Button onPress={openMenu}>Select an item</Button>}
            >
              <Menu.Item
                onPress={() => {
                  setOrder("CREATED_AT");
                  setOrderDirection("DESC");
                }}
                title="Latest repositories"
              />
              <Menu.Item
                onPress={() => {
                  setOrder("RATING_AVERAGE");
                  setOrderDirection("DESC");
                }}
                title="Highest rated repositories"
              />
              <Menu.Item
                onPress={() => {
                  setOrder("RATING_AVERAGE");
                  setOrderDirection("ASC");
                }}
                title="Lowest rated repositories"
              />
            </Menu>
          </View>
        }
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RepositoryItem
            item={item}
            onPress={() =>
              navigate(`/repositories/${item.id}`, {
                state: { repository: item },
              })
            }
          />
        )}
      />
    </PaperProvider>
  );
};

export default RepositoryList;
