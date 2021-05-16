import React, { FC } from "react";
import { View, SafeAreaView } from "react-native";
import Styles from "../styles";

const SafeView: FC = ({ children }) => (
  <SafeAreaView style={Styles.screen}>
    <View style={Styles.screen}>{children}</View>
  </SafeAreaView>
);

export default SafeView;
