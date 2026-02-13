import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import useReviews from "../hooks/useReviews";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,
  },
  flexItem: {
    padding: 10,
    margin: 5,
    borderColor: "#8e9091ff",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 7,
    alignSelf: "stretch",
    color: "#040404ff",
  },
  errorBorder: {
    borderColor: "#d73a4a",
  },
  flexButton: {
    padding: 15,
    margin: 5,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 7,
  },
  errorText: {
    paddingStart: 10,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
});

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const review = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      console.log(review);
      navigate(`/repositories/${review.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.flexContainer}>
      <TextInput
        style={styles.flexItem}
        placeholder="Repository owner name"
        placeholderTextColor="#999c9fff"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={[{ color: "#d73a4a" }, styles.errorText]}>
          {formik.errors.ownerName}
        </Text>
      )}
      <TextInput
        style={styles.flexItem}
        placeholder="Repository name"
        placeholderTextColor="#999c9fff"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={[{ color: "#d73a4a" }, styles.errorText]}>
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInput
        style={styles.flexItem}
        placeholder="Rating between 0 and 100"
        placeholderTextColor="#999c9fff"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={[{ color: "#d73a4a" }, styles.errorText]}>
          {formik.errors.rating}
        </Text>
      )}
      <TextInput
        style={styles.flexItem}
        placeholder="Review"
        placeholderTextColor="#999c9fff"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline
        numberOfLines="7"
      />
      <Pressable
        style={styles.flexButton}
        onPress={() => formik.handleSubmit()}
      >
        <Text fontWeight="bold" color="textSecondary">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
