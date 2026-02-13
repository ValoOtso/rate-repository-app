import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import { Provider as PaperProvider } from "react-native-paper";
import createApolloClient from "./src/utils/apolloClient";
import Main from "./src/components/Main";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();

const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <PaperProvider>
      <ApolloProvider client={apolloClient}>
        <NativeRouter>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </NativeRouter>
      </ApolloProvider>

      <StatusBar style="auto" />
    </PaperProvider>
  );
};

export default App;
