import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth/Auth";
import Main from "./Main/Main";
import { useSelector } from "react-redux";

function Gate() {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  return (
    <NavigationContainer>
      {/* {isLoggedIn ? <Main /> : <Auth />} */}
      <Main />
    </NavigationContainer>
  );
}

export default Gate;
