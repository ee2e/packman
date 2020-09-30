import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Icon } from "react-native-elements";

const testIDs = require("../testIDs");

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

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      date: "",
      title: "",
    };
  }

  componentDidMount() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    this.setState({
      title: year + "년 " + month + "월",
    });

    console.log(this.date);
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        var _date = new Date(time);
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              date:
                _date.getFullYear() +
                "년 " +
                `${_date.getMonth() + 1}월 ` +
                _date.getDate() +
                "일",
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: item.height }]}
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
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyData() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  render() {
    const { date } = this.state;

    return (
      <>
        <View style={styles.date}>
          <Text style={styles.dateText}>{this.state.title}</Text>
        </View>
        <Agenda
          style={styles.agendaContainer}
          testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          onDayPress={(day) =>
            this.setState({
              title: day.year + "년 " + day.month + "월",
              date: day.year + "-" + day.month + "-" + day.day,
            })
          }
          renderItem={this.renderItem.bind(this)}
          renderEmptyData={this.renderEmptyData.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
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
          onPress={() => alert("click")}
        />
      </>
    );
  }
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
