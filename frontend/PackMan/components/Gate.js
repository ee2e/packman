import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth/Auth";
import Main from "./Main/Main";

function Gate() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default Gate;
