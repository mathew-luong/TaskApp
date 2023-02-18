import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useContext } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { TaskContext } from '../shared/TaskProvider';


export default function Goal(props) {

    const [taskComplete, setTaskComplete] = useState(props.finished);
    const [goalOpen, setGoalOpen] = useState(false);
    const [goalClicked, setGoalClicked] = useState("");

    // Global task list which updates state 
    const [taskList,addTask,deleteTask,changeTaskName,taskFinish,finishedTasks,goalList,addGoal,goalClick] = useContext(TaskContext);

    const progressWidth = Math.round((props.progress / props.progressGoal) * 100) + "%";

    const taskPress = (task) => {
        setGoalOpen(!goalOpen);
    }

    const goalSuccessBtn = () => {
        // Only allow a goal to be pressed once per day and not pressed multiple times
        if(goalClicked === "") {
            goalClick(props.index, 1, props.dateCreated)
            setGoalClicked("Yes");
            setGoalOpen(false);
        }
    }

    const goalFailureBtn = () => {
        // Only allow a goal to be pressed once per day and not pressed multiple times
        if(goalClicked === "") {
            goalClick(props.index, 0, props.dateCreated)
            setGoalClicked("No");
            setGoalOpen(false);
        }
    }

    let progressMarker = "";
    if (props.progressGoal) {
        progressMarker = props.progress + " / " + props.progressGoal;
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
        <TouchableOpacity style={styles.container} onPress={taskPress}>
            <View style={[{width: progressWidth}, styles.goalProgressBackground]}>
            </View>
            <Text style={styles.goalName} numberOfLines={2} ellipsizeMode="tail">
                {props.name}{"\n"}
                <Text style={styles.goalDate}>this {props.deadline.toLowerCase()}</Text>
            </Text>
            <Text style={styles.goalProgress}>
                {progressMarker} times
            </Text>
            <View style={[{display: goalOpen ? 'block' : 'none'},styles.goalCheck]}>
                <Text style={styles.modalHeader}>Did you complete your goal today?</Text>
                <TouchableOpacity style={[styles.yesBtn,{backgroundColor: (goalClicked === "Yes" || goalClicked === "") ? "#29DD9C" : "#B0F3DB"}]} onPress={goalSuccessBtn}>
                    <Text style={[styles.yesBtnText]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.noBtn, {backgroundColor: (goalClicked === "No" || goalClicked === "") ? "#EA4141" : "#FAC7C7"}]} onPress={goalFailureBtn}>
                    <Text style={styles.noBtnText}>No</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff",
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 25,
        marginRight: 25,
        paddingTop: 15,
        marginVertical: 10,
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
        position: 'relative',
    },
    goalProgressBackground: {
        backgroundColor: '#29DD9C',
        position: 'absolute',
        top: 0,
        bottom: 0,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    goalName: {
        fontSize: 20,
        fontFamily: 'Lato-Regular',
        maxWidth: '65%',
        marginLeft: 35,
        marginBottom: 15,
    },
    goalDate: {
        color: '#939393',
        fontSize: 12,
    },
    goalProgress: {
        position: 'absolute',
        top: 25,
        right: 25,
        fontSize: 16,
    },
    goalCheck: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 85,
    },
    modalHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        marginBottom: 15,
        padding: 5,
        zIndex: 99999
    },
    yesBtn: {
        width: '50%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        backgroundColor: '#29DD9C',
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    yesBtnText: {
        color: '#fff',
        marginTop: 20,
        fontSize: 20,
    },
    noBtn: {
        width: '50%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: '#EA4141',
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noBtnText: {
        color: "#fff",
        fontSize: 20,
        marginTop: 20,
    }
});


