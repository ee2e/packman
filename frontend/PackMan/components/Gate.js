import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth/Auth";

function Gate() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}

export default Gate;
