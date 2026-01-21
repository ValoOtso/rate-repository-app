import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#f4f5f7ff",
    textGrey: "#7a7d84ff",
    primary: "#383a3bff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    font: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
