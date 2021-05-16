import { StyleSheet, TextStyle } from "react-native";

const baseText = { fontFamily: "Avenir-Light", color: "white" };
const smallText: TextStyle = { ...baseText, fontSize: 18, textAlign: "center" };
const continueText = { ...baseText, fontSize: 14, color: "#892cdc" };
export default StyleSheet.create({
  baseText,
  smallText,
  continueText,
  screen: {
    padding: "10%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
  bigText: { ...baseText, fontSize: 30 },
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
});
