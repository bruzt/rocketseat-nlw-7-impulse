import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import LogoSvg from "../../assets/logo.svg";
import { useUserContext } from "../../contexts/UserContext";
import { UserPhoto } from "../UserPhoto";

import { styles } from "./styles";

export function Header() {
  const userContext = useUserContext();

  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => userContext.logout()}>
          {userContext.user && <Text style={styles.logoutText}>Sair</Text>}
        </TouchableOpacity>

        <UserPhoto imageUri={userContext.user?.avatar_url} />
      </View>
    </View>
  );
}
