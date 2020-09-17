import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Find from "./Find";

const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Find" component={Find} />
    </Stack.Navigator>
  );
}
