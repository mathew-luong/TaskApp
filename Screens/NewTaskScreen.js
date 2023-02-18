import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useContext } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import XDate from 'xdate';
import { TaskContext } from '../shared/TaskProvider';


function formatDate(date) {
    let chosenDate = new XDate(date);
    let day = chosenDate.getDate();
    let mth = chosenDate.getMonth()+1;
    let year = chosenDate.getFullYear();
    // e.g. If the date is Aug 5, 2022 = 2022-08-05
    if(mth < 10) {
      mth = "0" + mth;
    }
    if(day < 10) {
      day = "0" + day;
    }
    return year + "-" + mth + "-" + day;
}

function formatDateLong(date) {
    let chosenDate = new XDate(date);
    const mth = chosenDate.toString("MMMM");
    const day = chosenDate.toString("dd");
    const year = chosenDate.toString("yyyy");
    return mth + " " + day + ", " + year;
}

export default function NewTaskScreen({navigation,route}) {
    // Date Picker States
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    // Category Dropdown States
    const [catgOpen, setCatgOpen] = useState(false);
    const [catg, setCatg] = useState("");
    const [catgItems, setCatgItems] = useState([
        {label: 'Personal', value: 'Personal'},
        {label: 'Work', value: 'Work'},
        {label: 'School', value: 'School'},
        {label: 'Home', value: 'Home'},
        {label: 'Family', value: 'Family'},
        {label: 'Other', value: 'Other'},
    ]);

    // Task name state
    const [taskName, setTaskName] = useState("");

    // Task description state
    const [taskDesc, setTaskDesc] = useState("");

    // Global tasklist and addTask function
    const [taskList,addTask] = useContext(TaskContext);

    // Handler for opening category dropdown
    const openCatgDropdown = () => {
        Keyboard.dismiss();
        setCatgOpen(!catgOpen);
    }
  
    const dateOnChange = (event, selectedDate) => {
      setShow(false);
      formatDate(selectedDate);
      setDate(selectedDate);
    };

    const catgOnChange = (catg) => {
        setCatg(catg);
    }

    const nameOnChange = (name) => {
        setTaskName(name);
    }

    const descOnChange = (desc) => {
        setTaskDesc(desc);
    }

  
    const showDatepicker = () => {
        setShow(true);
    };
    
    // const {title} = route.params;

    const saveBtn = () => {
        Keyboard.dismiss();
        // Category and name cannot be empty
        if(catg == "" || taskName == "") {
            Alert.alert(
                "Error creating task",
                "Please fill in all required fields",
                [{text: "OK"}]
            );
            return;
        }
        console.log("NAME: " + taskName + "\nDESC:" + taskDesc + "\nDATE: " + formatDate(date) + "\nCATG: " + catg);

        // Create new task object
        let newTask = {
            text: taskName,
            date: formatDate(date), 
            progress:'TO DO', 
            time: "12AM-12AM", 
            dateLong: formatDateLong(date),
            category: catg, 
            desc: taskDesc,
            finished: false
        }

        // Add the new task, updates state (using context)
        addTask(newTask);

        // Reset input values
        setDate(new Date());
        setCatg("");
        setTaskName("");
        setTaskDesc("");
        setCatgOpen(false)
        setShow(false);
        if(navigation.canGoBack()) {
            navigation.goBack();
          }
        navigation.navigate('Home');
    
    }

    const dismissOpenItems = () => {
        Keyboard.dismiss();
        setCatgOpen(false);
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
        <TouchableWithoutFeedback onPress={dismissOpenItems}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={true}
        style={styles.container}>
            <Text style={styles.header}>Create a new task</Text>
            <View style={styles.row}>
                <TextInput style={[styles.input,{width:'100%'}]} placeholder="Task name" value={taskName} onChangeText={nameOnChange}/>
            </View>
            <View style={styles.row}>
                <TextInput style={[styles.input,{width:'100%'}]} placeholder="Description (Optional)" value={taskDesc} onChangeText={descOnChange}/>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.dateInput} onPress={showDatepicker}>
                    <Text style={styles.placeholderText}>{date.toDateString()}</Text>
                </TouchableOpacity>
                <DropDownPicker
                    open={catgOpen}
                    value={catg}
                    items={catgItems}
                    setOpen={openCatgDropdown}
                    setValue={setCatg}
                    setItems={setCatgItems}
                    onChangeValue={catgOnChange}
                    containerStyle={styles.dropdownPickerContainer}
                    style={styles.dropdownPicker}
                    textStyle={styles.placeholderText}
                    dropDownContainerStyle={styles.dropdownLabel}
                    zIndex={9000}
                    maxHeight={500}
                    placeholder={"Select a Category"}
                />
            </View>
            <View style={styles.row}>
            <TouchableOpacity style={styles.modalSaveBtn} onPress={saveBtn}>
                <Text style={styles.modalBtnText}>Save</Text>
            </TouchableOpacity>
            </View>
            <View>
                {show && (
                    <DateTimePicker
                    // style={{width: 320, backgroundColor: "black", flex: 1}}
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    onChange={dateOnChange}
                    display="default"
                    style={styles.datepicker}
                    minimumDate={new Date()}
                    />
                )}
            </View>     
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        // paddingTop: '25%'
    },
    header: {
        // marginTop: 110,
        // marginTop: 75,
        fontSize: 30,
        marginLeft: 25,
        marginBottom: 15,
        fontWeight: '500',
        fontFamily: 'Lato-Regular'
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 25,
        marginBottom: 25,
        justifyContent: 'space-between',
        height: 50
    },
    dateInput: {
        backgroundColor: "#F1F1F1",
        padding: 12,
        width: '48%',
        borderRadius: 15,
        justifyContent: 'center'
    },
    placeholderText: {
        color: "#9ca3af",
        fontFamily: 'Lato-Regular',
    },
    input: {
        backgroundColor: "#F1F1F1",
        padding: 12,
        width: '48%',
        borderRadius: 15,
        fontFamily: 'Lato-Regular',
        zIndex: 1
    },
    modalBtnText: {
        color: "#fff",
        alignSelf: 'center',
        fontFamily: 'Lato-Regular'
    },
    modalSaveBtn: {
        backgroundColor: "#EA4141",
        borderRadius: 15,
        padding: 10,
        width: '100%',
        height: 40,
        // alignSelf: 'flex-start'
    },
    datepicker: {
        position: 'absolute',
        marginHorizontal: 50,
        width: '50%',
        fontFamily: 'Lato-Regular',
        height: 50,
        left: 10
    },
    dropdownPickerContainer: {
        width: '48%',
        borderWidth: 0,
        zIndex: 100,
    },
    dropdownPicker: {
        backgroundColor: "#F1F1F1",
        borderWidth: 0,
        borderRadius: 15,
        zIndex: 100,
    },
    dropdownLabel: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F1F1F1',
        zIndex: 100
    }
});