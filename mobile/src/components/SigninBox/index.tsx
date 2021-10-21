import React from "react";
import { View } from "react-native";

import { COLORS } from "../../theme";
import { Button } from "../Button";
import { useUserContext } from "../../contexts/UserContext";

import { styles } from "./styles";

export function SigninBox() {
  const userContext = useUserContext();

  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        isLoading={userContext.isSigningIn}
        onPress={() => userContext.login()}
      />
    </View>
  );
}
