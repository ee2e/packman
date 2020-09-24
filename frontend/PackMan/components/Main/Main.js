import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Calendars from "./Calendars";
import CheckList from "./CheckList";
import Camera from "./Camera";
import Settings from "./Settings";

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      labeled="true"
      barStyle={{ backgroundColor: "#03bcdb" }}
    >
      <Tab.Screen
        name="calendar"
        component={Calendars}
        options={{
          tabBarLabel: "달력",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="checkList"
        component={CheckList}
        options={{
          tabBarLabel: "준비물 목록",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="camera"
        component={Camera}
        options={{
          tabBarLabel: "카메라",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
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
