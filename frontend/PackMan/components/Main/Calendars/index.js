import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Icon, Text, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { checkListShow } from "../../../redux/checksSlice";

LocaleConfig.locales["ko"] = {
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
LocaleConfig.defaultLocale = "ko";

export default function AgendaScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const testIDs = require("../testIDs");
  const checks = useSelector((state) => state.checksReducer.checks);

  const [items, setItems] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTimeout(() => {
        dispatch(checkListShow());
        loadItems();
      }, 2000);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   console.log("너 몇번?");
  //   setItems({});
  //   setTimeout(() => {
  //     dispatch(checkListShow());
  //     loadItems();
  //   }, 1000);
  // }, [TEMP]);

  function loadItems(day) {
    for (const check of checks) {
      const _date = String(check.date);
      const newDate =
        _date.substr(0, 4) +
        "-" +
        _date.substr(4, 2) +
        "-" +
        _date.substr(6, 2);
      const newDate2 =
        _date.substr(0, 4) +
        "년 " +
        _date.substr(4, 2) +
        "월 " +
        _date.substr(6, 2) +
        "일";
      if (!items[newDate]) {
        items[newDate] = [];
      }
      items[newDate].push({
        id: check.id,
        name: check.content,
        date: newDate2,
        stuffs: check.stuffs,
      });
    }
    // console.log(items);
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    // console.log(newItems);
    setItems(newItems);
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={styles.item}
        onPress={() =>
          Alert.alert(
            `${item.date}`,
            "준비물 잘 챙겼는지 사진 한 번 찍어볼까요?",
            [
              {
                text: "취소",
                style: "cancel",
              },
              { text: "확인", onPress: () => navigation.navigate("camera") },
            ],
            { cancelable: true }
          )
        }
      >
        <Text
          h4
          style={{ textAlign: "center", marginTop: 10, marginBottom: 15 }}
        >
          {item.name}
        </Text>
        {item.stuffs.map((stuff) => (
          <View key={stuff.id}>
            <CheckBox title={stuff.name} checked={stuff.check} />
          </View>
        ))}
      </TouchableOpacity>
    );
  };

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <View style={styles.date}>
        <Text style={styles.dateText}>{title}</Text>
      </View>
      <Agenda
        style={styles.agendaContainer}
        testID={testIDs.agenda.CONTAINER}
        items={items}
        // loadItemsForMonth={loadItems}
        onDayPress={(day) => {
          setCurrentDate(day.year + "-" + day.month + "-" + day.day);
          setTitle(day.year + "년 " + day.month + "월");
        }}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
        rowHasChanged={rowHasChanged}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      ></Agenda>
      <Icon
        reverse
        name="plus"
        type="font-awesome"
        color="#03bcdb"
        containerStyle={styles.btnContainer}
        onPress={() => navigation.navigate("checkList")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  date: {
    marginTop: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontFamily: "BMHANNA",
    fontSize: 25,
    marginTop: 12,
  },
  agendaContainer: {},
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    position: "absolute",
    bottom: 12,
    right: 15,
  },
});
