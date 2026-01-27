import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useRepositories from "../hooks/useRepositories";

const TestComponent = () => {
  const { repositories, loading, error } = useRepositories();

  useEffect(() => {
    console.log("TestComponent mounted");
    console.log("repositories:", repositories);
    console.log("loading:", loading);
    console.log("error:", error);
  }, [repositories, loading, error]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Check the console for logs from TestComponent</Text>
    </View>
  );
};

export default TestComponent;
