import React from "react";

import { StyleSheet, View, Text } from "react-native";

import {
  Calendar,
  LocaleConfig,
  CalendarList,
  Agenda,
} from "react-native-calendars";

export default function Calendars() {
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "오늘",
  };
  LocaleConfig.defaultLocale = "fr";

  return (
    <View style={styles.inner}>
      <Calendar />
      {/* <Agenda
        items={{
          "2020-09-22": [{ name: "item 1 - any js object" }],
          "2020-09-23": [{ name: "item 2 - any js object", height: 80 }],
          "2020-09-24": [],
          "2020-09-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
});
