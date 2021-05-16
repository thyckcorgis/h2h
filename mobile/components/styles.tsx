import { StyleSheet, TextStyle, ViewStyle } from "react-native";

const baseText = { fontFamily: "Avenir-Light", color: "white" };
const smallText: TextStyle = { ...baseText, fontSize: 18, textAlign: "center" };
const bigText: TextStyle = { ...baseText, fontSize: 30 };
const continueText = { ...baseText, fontSize: 14, color: "#892cdc" };
const center: ViewStyle = { alignItems: "center", justifyContent: "center", flex: 1 };
export default StyleSheet.create({
  baseText,
  smallText,
  center,
  continueText,
  bigText,
  screen: { ...center, padding: "10%", backgroundColor: "black" },
  smallGeorgiaText: { ...smallText, fontFamily: "Georgia" },
  bigGeorgiaText: { ...bigText, fontFamily: "Georgia" },
  errorText: { ...continueText, textAlign: "center", color: "red", padding: 10 },
  inputField: {
    ...smallText,
    textAlign: "left",
    padding: "2%",
    paddingTop: "5%",
    width: "75%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
  },
  full: { width: "100%", height: "100%" },
});
