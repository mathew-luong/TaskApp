import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Image, Keyboard } from 'react-native';
import { useState,  useContext, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import Goal from '../components/Goal';
import { useFonts } from 'expo-font';
import XDate from 'xdate';
import { TaskContext } from '../shared/TaskProvider';
import { TextInput } from 'react-native-gesture-handler';

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

export default function GoalsScreen({navigation,route}) {

    // Global task list which updates state 
    const [taskList,addTask,deleteTask,changeTaskName,taskFinish,finishedTasks,goalList,addGoal] = useContext(TaskContext);

    // Modal for creating a goal
    const [modalOpen, setModalOpen] = useState(false);

    const [goalProgress, setGoalProgress] = useState("");
    const [goalName, setGoalName] = useState("");
    const [goalDeadline, setGoalDeadline] = useState("");

    const currDate = new XDate();

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


    const handleNewGoalBtn = () => {
        if(modalOpen) {
            setGoalProgress("");
            setGoalName("");
            setGoalDeadline("");
        }
        setModalOpen(!modalOpen)
        // addGoal({name:"Read 30 minutes",progress:5, progressGoal: 5})
    }

    const saveNewGoalBtn = () => {
        let newGoal = {
            name: goalName,
            progress: 0,
            progressGoal: goalProgress,
            deadline: goalDeadline,
            dateCreated: currDate
        }
        addGoal(newGoal);
        setGoalProgress("");
        setGoalName("");
        setGoalDeadline("");
        Keyboard.dismiss();
        setModalOpen(false);
    }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" /> 
            <Text style={styles.header}>
                Your Goals
            </Text>
            <View>
                <TouchableOpacity onPress={handleNewGoalBtn} style={styles.newGoalBtn}>
                    <Text style={[styles.newGoalBtnText1,{fontFamily: 'Lato-Regular'}]}>New Goal</Text>
                    <Image source={require('../assets/plus.png')} style={styles.newGoalIcon}></Image>
                </TouchableOpacity>
            </View>
            <View style={[{ display: modalOpen ? 'flex' : 'none'},styles.newGoalModal]}>
                <Text style={styles.newGoalHeader}>Create a new goal</Text>
                <View style={styles.row}>
                    <Text style={[{fontSize: 16}, styles.right]}>I want to</Text>
                    <TextInput placeholder="your goal here" value={goalName} onChangeText={setGoalName} style={{fontSize: 16, color: "#EA4141"}}></TextInput>
                </View>
                <View style={styles.row}>
                    <TextInput placeholder="#" keyboardType="numeric" value={goalProgress} onChangeText={setGoalProgress} style={{fontSize: 16, color: "#EA4141"}}></TextInput>
                    <Text style={[{fontSize: 16}, styles.left]}>times</Text>
                </View>
                <View style={[styles.row,{marginBottom: 35}]}>
                    <Text style={[{fontSize: 16}, styles.right]}>this</Text>
                    <TextInput placeholder="week/month/year" value={goalDeadline} onChangeText={setGoalDeadline} style={{fontSize: 16, color: "#EA4141"}}></TextInput>
                </View>
                <TouchableOpacity style={styles.newGoalSaveBtn} onPress={saveNewGoalBtn}>
                    <Text style={styles.newGoalBtnText}>Create goal</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll}>
                {
                    goalList.map((item,ind) => {
                        // if(item.date === getCurrDateStr(currDate)) {
                        return <Goal key={ind} index={ind} name={item.name} progress={item.progress} progressGoal={item.progressGoal} dateCreated={item.dateCreated} deadline={item.deadline}/>
                        // }
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
    newGoalBtn: {
        backgroundColor: "#fff",
        borderRadius: 15,
        marginLeft: 25,
        marginRight: 25,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
        fontFamily: 'Lato-Regular',
        borderColor: "#EA4141",
        borderWidth: 2,
    },
    newGoalBtnText1: {
        fontSize: 16,
    },
    newGoalIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        width: 20,
        height: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8
    },
    newGoalSaveBtn: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: '#EA4141',
        borderRadius: 15,
        padding: 10,
    },
    newGoalBtnText: {
        color: '#fff'
    },
    newGoalModal: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 15,
        padding: 15,
        width: '87.5%',
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
    },
    newGoalModalText: {
        fontSize: 16,
    },
    newGoalHeader: {
        fontSize: 24,
        marginBottom: 15,
        width: '70%'
    },
    right: {
        marginRight: 6
    },
    left: {
        marginLeft: 6
    },
});