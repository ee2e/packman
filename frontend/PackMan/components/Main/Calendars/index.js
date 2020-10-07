import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Icon, Text, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { checkListShow } from "../../../redux/checksSlice";
import { FontAwesome } from "@expo/vector-icons";

import Camera from "../Camera";
import CheckList from "../CheckList";
import CheckStuff from "../CheckStuff";

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

function Calendars({ navigation, route }) {
  const dispatch = useDispatch();

  const testIDs = require("../testIDs");
  const checks = useSelector((state) => state.checksReducer.checks);

  const [items, setItems] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const [title, setTitle] = useState("");

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     const year = new Date().getFullYear();
  //     const month = new Date().getMonth() + 1;
  //     const temp_day = new Date().getDate();

  //     if (String(temp_day).length === 2) {
  //       day = temp_day;
  //     } else {
  //       day = "0" + temp_day;
  //     }

  //     setTitle(year + "년 " + month + "월");
  //     setCurrentDate(year + "-" + month + "-" + String(day));

  //     console.log("캘린더로 돌아왔음");
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const temp_day = new Date().getDate();

    if (String(temp_day).length === 2) {
      day = temp_day;
    } else {
      day = "0" + temp_day;
    }

    setTitle(year + "년 " + month + "월");
    setCurrentDate(year + "-" + month + "-" + String(day));

    console.log("캘린더로 돌아왔음");
    dispatch(checkListShow());
  }, []);

  useEffect(() => {
    console.log("난 체크가 바뀔때마다 실행되지롱~");
    loadItems();
  }, [checks]);

  function loadItems(day) {
    const tempItems = {};
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
      if (!tempItems[newDate]) {
        tempItems[newDate] = [];
      }
      tempItems[newDate].push({
        id: check.id,
        name: check.content,
        date: newDate2,
        stuffs: check.stuffs,
      });
    }
    const newItems = {};
    Object.keys(tempItems).forEach((key) => {
      newItems[key] = tempItems[key];
    });
    setItems(newItems);
    console.log("체크리스트 다 로드했음~");
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
              {
                text: "확인",
                onPress: () =>
                  navigation.navigate("camera", {
                    suppliesId: item.id,
                  }),
              },
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
        <Text style={{ fontFamily: "BMHANNA", fontSize: 20 }}>
          준비물을 한 번 챙겨볼까요?
        </Text>
        <View style={{ display: "absolute", bottom: -223, left: 18 }}>
          <View>
            <Text
              style={{
                fontFamily: "BMHANNA",
                fontSize: 20,
              }}
            >
              클릭해서 등록 !&nbsp;&nbsp;
              <FontAwesome name="hand-o-right" size={24} color="black" />
            </Text>
          </View>
        </View>
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
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{title}</Text>
        </View>
      </View>
      <Agenda
        style={styles.agendaContainer}
        testID={testIDs.agenda.CONTAINER}
        items={items}
        // loadItemsForMonth={loadItems}
        onDayPress={(day) => {
          setCurrentDate(day.dateString);
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
        onPress={() => navigation.navigate("checkList", { date: currentDate })}
      />
    </>
  );
}

const styles = StyleSheet.create({
  date: {
    marginTop: 40,
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

const CalendarsStack = createStackNavigator();

export default function CalendarsStackScreen() {
  return (
    <CalendarsStack.Navigator headerMode="none">
      <CalendarsStack.Screen name="calendars" component={Calendars} />
      <CalendarsStack.Screen name="checkList" component={CheckList} />
      <CalendarsStack.Screen name="camera" component={Camera} />
      <CalendarsStack.Screen name="checkStuff" component={CheckStuff} />
    </CalendarsStack.Navigator>
  );
}
