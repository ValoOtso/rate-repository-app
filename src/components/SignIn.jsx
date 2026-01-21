import { TextInput, View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";

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
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  const usernameError =
    formik.touched.username && Boolean(formik.errors.username);

  const passwordError =
    formik.touched.password && Boolean(formik.errors.password);

  return (
    <View style={styles.flexContainer}>
      <TextInput
        style={[styles.flexItem, usernameError && styles.errorBorder]}
        placeholder="Username"
        placeholderTextColor="#999c9fff"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={[{ color: "#d73a4a" }, styles.errorText]}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[styles.flexItem, passwordError && styles.errorBorder]}
        secureTextEntry="true"
        placeholder="Password"
        placeholderTextColor="#999c9fff"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={[{ color: "#d73a4a" }, styles.errorText]}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable style={styles.flexButton} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" color="textSecondary">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
