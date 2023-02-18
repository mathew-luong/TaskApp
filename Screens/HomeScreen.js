import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import XDate from 'xdate';
import { useContext } from 'react';
import { TaskContext } from '../shared/TaskProvider';




export default function HomeScreen({navigation}) {

    // Global task list which updates state 
    const [taskList,addTask,deleteTask,changeTaskName,taskFinish,numTasksFinished,goalList,addGoal] = useContext(TaskContext);


    let tasksFinished = numTasksFinished;


    const getPercentCompleted = () => {
        if(taskList.length == 0) {
            return 0;
        }
        else {
            return Math.floor(tasksFinished / taskList.length).toString();
        }
    }

    // const date = new Date();
    const date = new XDate();


    const mth = date.toString("MMMM");
    const day = date.toString("dd");
    const dayName = date.toString("dddd");


    const todaysTasksBtn = () => {
        navigation.push('TodaysTasks');
    }

    const goalsBtn = () => {
        navigation.push('Goals');
    }


    let [fontsLoaded] = useFonts({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
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
            <Text style={[styles.header,{fontFamily: 'Lato-Bold'}]}>
                Overview
            </Text>
            <Text style={[styles.date,{fontFamily: 'Lato-Regular'}]}>
                {dayName + ", " + mth + " " + day}
            </Text>
            <Text style={[styles.info,{fontFamily: 'Lato-Regular'}]}>
                <Text style={styles.redText}>
                    {(taskList.length == 0) ?  0 : Math.round((tasksFinished / taskList.length) * 100)}%
                </Text>   of Tasks Completed
            </Text>
            <Text style={[styles.info,,{fontFamily: 'Lato-Regular'}]}>
                <Text style={styles.redText}>0</Text>   Goals Reached
            </Text>
            <View style={styles.cardContainer}>
                <View style={styles.card}> 
                    <Text style={[styles.cardTitle,{fontFamily: 'Lato-Regular'}]}>{taskList.length - tasksFinished}</Text>
                    <Text style={[styles.cardSubTitle,{fontFamily: 'Lato-Regular'}]}>To Do</Text>
                </View>
                <View style={styles.card2}> 
                    <Text style={[styles.cardTitle2,{fontFamily: 'Lato-Regular'}]}>{tasksFinished}</Text>
                    <Text style={[styles.cardSubTitle2,{fontFamily: 'Lato-Regular'}]}>Complete</Text>
                </View>
                <View style={styles.card2}> 
                    <Text style={[styles.cardTitle2,{fontFamily: 'Lato-Regular'}]}>{goalList.length}</Text>
                    <Text style={[styles.cardSubTitle2,{fontFamily: 'Lato-Regular'}]}>Goals</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.goalsCard} onPress={goalsBtn}>
                <Text style={[styles.todaysTasksTitle,{fontFamily: 'Lato-Regular'}]}>Manage Your{"\n"}Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.todaysTasks} onPress={todaysTasksBtn}>
                <Text style={[styles.todaysTasksTitle,{fontFamily: 'Lato-Regular'}]}>View Your{"\n"}Tasks</Text>
                <Image source={require('../assets/arrow.png')} style={styles.todaysTasksImg}></Image>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFBFF"

    },
    header: {
        marginTop: 25,
        fontSize: 30,
        marginLeft: 25,
        marginBottom: 15,
        fontWeight: '500'
    },
    date: {
        position: 'absolute',
        right: 25,
        top: 35,
        fontSize: 15,
    },
    info: {
        marginLeft: 25,
        marginTop: 15,
        fontSize: 15,
    },
    redText: {
        color: "#EA4141",
        fontSize: 20,
    },
    cardContainer: {
        // flex: 1,
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 25,
        justifyContent: 'space-between'
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        backgroundColor: "#EA4141",
        // shadowColor: '#CECECE',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 10,  
        // elevation: 10,
        width: '29%',
        height: 100
    },
    card2: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
        width: '29%',
        height: 100
    },
    cardTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 15
    },
    cardTitle2: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 15
    },
    cardSubTitle: {
        fontSize: 12,
        color: '#E6E6E6',
    },
    cardSubTitle2: {
        fontSize: 12,
        color: '#B9B9B9'
    },
    goalsCard: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 15,
        marginHorizontal: 25,
        padding: 15,
        marginTop: 25,
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
        position: 'relative',
        fontFamily: 'Lato-Regular',
        flex: 1
    },
    todaysTasks: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 15,
        marginHorizontal: 25,
        padding: 15,
        paddingVertical: 45,
        marginVertical: 25,
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
        position: 'relative',
        fontFamily: 'Lato-Regular',
        flex: 1,
        justifyContent: 'center',
    },
    todaysTasksTitle: {
        fontSize: 28,
        width: '80%',
        alignSelf: 'center'
    },
    todaysTasksImg: {
        // width: 25,
        // height: 35,
        width: 30,
        height: 50,
        alignSelf: 'center',
        // alignSelf: 'flex-end',
        tintColor: '#EA4141',
        marginRight: 10
    }
});