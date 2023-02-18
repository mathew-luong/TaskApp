import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useState,  useContext, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import Task from '../components/Task';
import { useFonts } from 'expo-font';
import XDate from 'xdate';
import { TaskContext } from '../shared/TaskProvider';


function getCurrDateStr(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if(month < 10) {
        month = "0" + month;
    }
    if(day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}

export default function TodaysTasksScreen({navigation,route}) {

    // Global task list which updates state
    const [taskList,addTask] = useContext(TaskContext);

    const [upcomingTasksOpen, setUpcomingTasks] = useState(false);

    const currDate = new XDate();

    const openUpcomingTasks = () => {
        setUpcomingTasks(!upcomingTasksOpen);
    }

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
            <Text style={[{ display: upcomingTasksOpen ? 'none' : 'flex' },styles.header]}>
                Today's Tasks
            </Text>
            <ScrollView style={[{ display: upcomingTasksOpen ? 'none' : 'flex' },styles.scroll]}>
                {
                    taskList.map((item,ind) => {
                        if(item.date === getCurrDateStr(currDate)) {
                            return <Task key={ind} index={ind} text={item.text} progress={item.progress} finished={item.finished} category={item.category} desc={item.desc}/>
                        }
                    })
                }
            </ScrollView>
            <View style={[{ marginBottom: upcomingTasksOpen ? 0 : 10, borderTopWidth: upcomingTasksOpen ? 0 : 1 },styles.upcomingTasksContainer]}>
                <Text style={styles.headerUpcomingTasks}>
                    Upcoming Tasks
                </Text>
                <TouchableOpacity style={styles.openBottomsheetBtn} onPress={openUpcomingTasks}>
                        <Text style={styles.plusSymbol}>{upcomingTasksOpen ? "Close" : "Open" }</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={[{ display: upcomingTasksOpen ? 'flex' : 'none'},styles.scrollUpcomingTasks]}>
                {
                    taskList.map((item,ind) => {
                        if(item.date !== getCurrDateStr(currDate)) {
                            return <Task key={ind} index={ind} text={item.text} progress={item.progress} finished={item.finished} date={item.dateLong}/>
                        }
                    })
                } 
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#FAFBFF",
    },
    scroll: {
        backgroundColor: "#FAFBFF",
    },
    header: {
        marginTop: 15,
        fontWeight: '500',
        fontSize: 30,
        marginLeft: 25,
        marginBottom: 10,
        fontFamily: 'Lato-Bold'
    },
    upcomingTasksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10,
        borderTopColor: "#BBBBBB",
    },
    upcomingTasksContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 0,
        borderTopWidth: 0,
        borderColor: "#EA4141",
    },
    headerUpcomingTasks: {
        fontWeight: '500',
        fontSize: 30,
        marginLeft: 25,
        fontFamily: 'Lato-Bold'
    }, 
    headerUpcomingTasks2: {
        fontSize: 24,
        marginLeft: 25,
        fontFamily: 'Lato-Regular'
    }, 
    scrollUpcomingTasks: {
        backgroundColor: "#FAFBFF",
    },
    openBottomsheetBtn2: {
        backgroundColor: '#EA4141',
        borderRadius: 14,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        paddingHorizontal: 10,
    },
    openBottomsheetBtn: {
        backgroundColor: '#EA4141',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 35,
        marginRight: 25,
    },
    plusSymbol: {
        fontSize: 15,
        color: "#fff",
        alignSelf: 'center'
    }
    
});