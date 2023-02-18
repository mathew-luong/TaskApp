import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Calendar } from 'react-native-calendars';
import CalendarTask from '../components/CalendarTask';
import XDate from 'xdate';
import { useContext } from 'react';
import { TaskContext } from '../shared/TaskProvider';

// Given day,mth,yr as numbers convert it to a string
// e.g. 1/1/2022 = January 1, 2022
function convToDateStr(dayNum,mthNum,yrNum) {
    let date = new XDate(yrNum,mthNum,dayNum);
    let mth = date.toString("MMMM");
    const day = date.toString("dd");
    const yr = date.toString("yyyy");

    return mth + " " + day + ", " + yr;
} 



export default function CalendarScreen({navigation,route}) {

    // Global task list which updates state 
    const [taskList,addTask] = useContext(TaskContext);

    const currDate = new XDate();
    const initialTaskStr = "Tasks for " + convToDateStr(currDate.getDate(),currDate.getMonth(),currDate.getFullYear());

    // Initial state for list of tasks for the current date
    const setInitTasks = (date) =>  {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        // Append 0 if mth/day is less than 10 for formatting
        if(month < 10) {
            month = "0" + month;
        }
        if(day < 10) {
            day = "0" + day;
        }
        let currDate = date.getFullYear() + "-" + month + "-" + day;
        let taskArr = [];
        taskList.map((item) => {
            if(item.date == currDate) {
                taskArr = taskArr.concat(item.text);
            }
        })
        return taskArr;
    }
    
    // State for header message 'Tasks for <date>'
    const [selectedDayText, setSelectedDayText] = useState(initialTaskStr);
    // State for updating circle for selected date on calendar
    const [selectedDay, setSelectedDay] = useState();
    // State for list of tasks for selected date
    const [selectedDayTasks, setSelectedDayTasks] = useState(setInitTasks(currDate));

    // USE EFFECT HEREs

    const setTasks = (date) => {
        // array of tasks corresponding to the date
        let taskArr = []
        taskList.map((item) => {
            if(item.date == date) {
                taskArr = taskArr.concat(item.text);
            }
        })
        // updates the state according to the date
        setSelectedDayTasks(taskArr);
    }

    // Handler for when the user clicks a day on the calendar
    const dayPressed = (day) => {
        // Convert numeric date to string e.g. 2022-29-00 = Jan 29 2022 (mth is 0 indexed)
        setSelectedDayText("Tasks for " + convToDateStr(day.day,day.month-1,day.year));
        // Update list of tasks
        setTasks(day.dateString);
        // Update highlighted date
        setSelectedDay(day.dateString);
    };


    // FONTS
    let [fontsLoaded] = useFonts({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" /> 
            <Text style={styles.header}>
                    Calendar
            </Text>
            <Calendar
            // Initially visible month. Default = now
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={currDate.toLocaleDateString()}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={dayPressed}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            // onMonthChange={month => {
            //     console.log('month changed', month);
            // }}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
            style={styles.calendar}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                // textSectionTitleColor: '#b6c1cd',
                // textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#EA4141',
                selectedDayTextColor: '#fff',
                todayTextColor: '#EA4141',
                dayTextColor: '#4B4B4B',
                // textDisabledColor: '#d9e1e8',
                dotColor: '#EA4141',
                selectedDotColor: '#EA4141',
                arrowColor: '#EA4141',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: '#EA4141',
                indicatorColor: '#EA4141',
                textDayFontFamily: 'Lato-Regular',
                textMonthFontFamily: 'Lato-Regular',
                textDayHeaderFontFamily: 'Lato-Regular',
            }}
            markingType={'multi-dot'}
            markedDates={{
                [selectedDay]: {selected: true, marked: true, selectedColor: '#EA4141'},
            }}

            />
            <View style={styles.selectedDateContainer}>
                <Text style={styles.selectedDateHeader}>{selectedDayText}</Text>
                <ScrollView style={styles.scroll}>
                    {
                        // render a calendar task for each task associated with the selected day
                        selectedDayTasks.map((itemName,ind) => {
                            return <CalendarTask key={ind} text={itemName}></CalendarTask>
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        // justifyContent: 'center'
    },
    header: {
        // marginTop: 110,
        marginTop: 75,
        fontSize: 30,
        marginLeft: 25,
        marginBottom: 10,
        fontWeight: '500',
        fontFamily: 'Lato-Regular'
    },
    calendar: {
       marginHorizontal: 25,
       marginTop: 10,
    },
    selectedDateContainer: {
        flex: 1,
        // backgroundColor: "gray",
        marginHorizontal: 25,
        marginVertical: 25,
        padding: 5
    },
    selectedDateHeader: {
        fontSize: 25,
        fontFamily: 'Lato-Regular',
        marginBottom: 10
    },
    scroll: {
        flex: 1,
        padding: 5,
        // justifyContent: 'center'
    }
});