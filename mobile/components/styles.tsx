import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    padding: "10%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    // borderColor: "red",
    // borderWidth: 1,
  },
  bigText: { fontFamily: "Avenir-Light", fontSize: 30, color: "white" },
  smallText: { fontFamily: "Avenir-Light", fontSize: 18, color: "white", textAlign: "center" },
  continueText: { fontFamily: "Avenir-Light", fontSize: 14, color: "#892cdc" },
  errorText: {
    fontFamily: "Avenir-Light",
    fontSize: 14,
    textAlign: "center",
    color: "red",
    padding: 10,
  },
  inputField: {
    padding: "2%",
    paddingTop: "5%",
    width: "75%",
    textAlign: "left",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 18,
    color: "white",
    fontFamily: "Avenir-Light",
  },
});