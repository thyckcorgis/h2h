import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    padding: "10%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
  bigText: {
    fontFamily: "Avenir-Light",
    fontSize: 30,
    color: "white",
  },
  smallText: {
    fontFamily: "Avenir-Light",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  errorText: {
    fontFamily: "Avenir-Light",
    fontSize: 14,
    textAlign: "center",
    color: "red",
    padding: 10,
  },
  continueText: {
    fontFamily: "Avenir-Light",
    fontSize: 14,
    color: "#892cdc",
  },
  inputField: {
    padding: "2%",
    paddingTop: "5%",
    width: "70%",
    textAlign: "left",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 18,
    color: "white",
    fontFamily: "Avenir-Light",
  },
});
