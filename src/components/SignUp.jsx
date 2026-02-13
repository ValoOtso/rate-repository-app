import { TextInput, View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import UseSignUp from "../hooks/useSignUp";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";

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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const [signUp] = UseSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    console.log("SIGN UP SUBMIT ATTEMPT", values);

    try {
      const user = await signUp({ username, password });
      console.log(user);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.flexContainer}>
      <TextInput
        style={styles.flexItem}
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
        style={styles.flexItem}
        secureTextEntry={true}
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
      <TextInput
        style={styles.flexItem}
        secureTextEntry={true}
        placeholder="Password confirmation"
        placeholderTextColor="#999c9fff"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={[{ color: "#d73a4a" }, styles.errorText]}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}
      <Pressable
        style={styles.flexButton}
        onPress={() => formik.handleSubmit()}
      >
        <Text fontWeight="bold" color="textSecondary">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
