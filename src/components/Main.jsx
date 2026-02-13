import React from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { Routes, Route } from "react-router-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RepositoryPage from "./RepositoryPage";
import ReviewForm from "./ReviewForm";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/repositories/:id" element={<RepositoryPage />} />
        <Route path="/reviewform" element={<ReviewForm />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myReviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
