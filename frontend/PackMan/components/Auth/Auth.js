import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
