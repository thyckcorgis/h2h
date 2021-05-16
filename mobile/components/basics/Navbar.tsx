import React, { Children, FC } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";

import { UserButton, QuitButton } from "../../assets/images";

interface NavBarProps {
  userButtonHandler: () => void;
  quitButtonHandler: () => void;
}
const NavBar: FC<NavBarProps> = ({ children, userButtonHandler, quitButtonHandler }) => (
  <View style={styles.navBar}>
    <TouchableOpacity onPress={userButtonHandler}>
      <UserButton height={95} />
    </TouchableOpacity>
    {children}
    <TouchableOpacity onPress={quitButtonHandler}>
      <QuitButton height={95} />
    </TouchableOpacity>
  </View>
);

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
});
