import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useContext } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { TaskContext } from '../shared/TaskProvider';


export default function Task(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [taskName,setTaskName] = useState(props.text);
    const [taskComplete, setTaskComplete] = useState(props.finished);

    // Global task list which updates state 
    const [taskList,addTask,deleteTask,changeTaskName,taskFinish] = useContext(TaskContext);

    const taskPress = () => {
        setModalVisible(true);
    }

    const handleTaskDelete = () => {
        deleteTask(props.index,props.text,taskComplete);
        setModalVisible(false);
    }

    const handleChangeName = (newName) => {
        setTaskName(newName);
        changeTaskName(props.index,newName);
    }

    const handleTaskFinish = () => {
        setTaskComplete(!taskComplete);
        if(taskComplete) {
            taskFinish(props.index,"TO DO");
        }
        else {
            taskFinish(props.index,"COMPLETE");
        }
    }

    const closeModal = () => {
        setModalVisible(false);
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
        // <Swipeable onSwipeableOpen={}>
        <TouchableOpacity style={styles.container} onPress={taskPress}>
        {/* <TouchableOpacity style={[styles.container, modalVisible ? {backgroundColor: 'rgba(100,100,100,0.5)'} : '']} onPress={taskPress}> */}
            <Modal 
                visible={modalVisible} 
                animationType="slide"     
                transparent={true}   
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <KeyboardAvoidingView style={styles.bottomsheetContainer} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={true}>
                    <Text style={styles.bottomsheetText}>{props.text}</Text>
                    <TouchableOpacity onPress={closeModal} style={styles.bottomsheetCloseBtn}>
                        <Text style={styles.closeBtnText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.bottomsheetSubText}>{props.desc}</Text>
                    {/* <TouchableOpacity onPress={handleChangeName}>
                        <Text>Edit task name</Text>
                    </TouchableOpacity> */}
                    {/* <TextInput placeholder="Edit Task Name" onChangeText={handleChangeName}></TextInput> */}
                    <TouchableOpacity onPress={handleTaskDelete} style={styles.bottomsheetSaveBtn}>
                        <Text style={styles.bottomsheetBtnText}>Delete task</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>
            <TouchableOpacity style={taskComplete ? styles.progressBtnComplete : styles.progressBtn}onPress={handleTaskFinish}>
                <Image
                    source={require('../assets/checkmark.png')}
                    resizeMode='contain'
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: taskComplete ? '#fff' : '#EA4141'
                    }}
                />
            </TouchableOpacity>
            <Text style={styles.taskName} numberOfLines={1} ellipsizeMode="tail">
                {props.text}
            </Text>
            <Text style={styles.taskProgress}>
                {props.progress}
            </Text>
            <Text style={props.desc === "" ? styles.invisible : styles.taskDescription} numberOfLines={2} ellipsizeMode="tail">
                {props.desc}
            </Text>
            <Text style={styles.taskTime}>
                {props.date}
            </Text>
            <View style={styles.taskCategory}>
                <Text style={styles.taskCategoryText}>
                    {props.category}
                </Text>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 15,
        // marginTop: 15,
        marginLeft: 25,
        marginRight: 25,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
        position: 'relative',
    },
    invisible: {
        marginBottom: 10,
    },
    progressBtn: {
        position: 'absolute',
        borderRadius: 360,
        left: 10,
        top: '50%',
        bottom: '50%',
        borderColor: '#EA4141',
        borderWidth: 2,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    },
    progressBtnComplete: {
        position: 'absolute',
        borderRadius: 360,
        left: 10,
        top: '50%',
        bottom: '50%',
        backgroundColor: '#29DD9C',
        borderWidth: 2,
        borderColor: '#29DD9C',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    },
    taskName: {
        fontSize: 20,
        fontFamily: 'Lato-Regular',
        maxWidth: '65%',
        marginLeft: 35,
    },
    taskProgress: {
        position: 'absolute',
        top: 20,
        right: 15,
        fontSize: 14,
        color: "#EA4141",
        fontFamily: 'Lato-Regular'
    },
    taskDescription: {
        maxWidth: "90%",
        maxHeight: "60%",
        color: "#939393",
        fontFamily: 'Lato-Regular',
        marginBottom: 30,
        marginTop: 10,
        marginLeft: 35
    },
    taskTime: {
        position: 'absolute',
        left: 15,
        bottom: 15,
        fontFamily: 'Lato-Regular',
        marginLeft: 35,
    },
    taskCategory: {
        position: 'absolute',
        // right: 15,
        // bottom: 15,
        right: 0,
        bottom: 0,
        backgroundColor: "#EA4141",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        fontFamily: 'Lato-Regular'
    },
    taskCategoryText: {
        color: "#fff",
        fontFamily: 'Lato-Regular'
    },
    bottomsheetContainer: {
        backgroundColor: "#F1F3F9",
        padding: 20,
        borderRadius: 15,
        // height: '30%',
        // maxHeight: '30%',
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    bottomsheetText: {
        fontSize: 25,
        maxWidth: '80%',
        marginBottom: 5
    },
    bottomsheetSubText: {
        fontSize: 15,
        color: 'gray',
        margin: 0,
    },
    bottomsheetSubText2: {
        color: '#EA4141',
        fontSize: 15,
        marginTop: 5
    },
    bottomsheetBtnText: {
        color: "#fff",
        alignSelf: 'center',
        fontFamily: 'Lato-Regular'
    },
    bottomsheetSaveBtn: {
        backgroundColor: "#EA4141",
        borderRadius: 15,
        padding: 10,
        position: 'relative',
        marginTop: 20,
        marginBottom: 20
    },
    bottomsheetCloseBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#EA4141',
        borderRadius: 15,
        width: 60,
        height: 30,
        paddingHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    }
});


