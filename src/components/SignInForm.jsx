import { View, TextInput, Button } from "react-native";
import { Formik } from "formik";

const SignInForm = ({ onSubmit }) => (
  <Formik initialValues={{ username: "", password: "" }} onSubmit={onSubmit}>
    {({ handleChange, handleSubmit, values }) => (
      <View>
        <TextInput
          placeholder="Username"
          value={values.username}
          onChangeText={handleChange("username")}
          testID="usernameField"
        />
        <TextInput
          placeholder="Password"
          value={values.password}
          onChangeText={handleChange("password")}
          secureTextEntry
          testID="passwordField"
        />
        <Button title="Sign In" onPress={handleSubmit} />
      </View>
    )}
  </Formik>
);

export default SignInForm;
