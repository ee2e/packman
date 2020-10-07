import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./Calendars";
import Settings from "./Settings";

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      labeled="true"
      barStyle={{ backgroundColor: "#03bcdb", height: 70 }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "달력",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "설정",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
