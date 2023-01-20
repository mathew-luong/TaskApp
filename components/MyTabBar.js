import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../Screens/CalendarScreen';
import TodaysTasksScreen from '../Screens/TodaysTasksScreen';
import HomeScreen from '../Screens/HomeScreen';
import NewTaskScreen from '../Screens/NewTaskScreen';
import { useFonts } from 'expo-font';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

const NewTaskBtn = ({children, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.newTaskBtn}>
        <View style={styles.newTaskIcon}>
            {children}
        </View>
    </TouchableOpacity>
);

export default function MyTabBar() {

    const StackNav = createStackNavigator();

    const options = {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
            ...styles.container
        },
    }

    const homeScreenOptions = {
        tabBarIcon: ({focused}) => (
            <View style={styles.tabIcon}>
                <Image
                    source={require('../assets/home.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#EA4141' : '#000'
                    }}
                />
                <Text style={{color: focused ? '#EA4141' : '#000', fontSize: 12,fontFamily: 'Lato-Regular'}}>Home</Text>
            </View>
        ),
    }

    const calendarScreenOptions = {
        tabBarIcon: ({focused}) => (
            <View style={styles.tabIcon}>
                <Image
                    source={require('../assets/calendar.png')}
                    resizeMode='contain'
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: focused ? '#EA4141' : '#000'
                    }}
                />
                <Text style={{color: focused ? '#EA4141' : '#000', fontSize: 12,fontFamily: 'Lato-Regular'}}>
                    Calendar
                </Text>
            </View>
        ),
    }

    const newTaskOptions = {
        tabBarIcon: ({focused}) => (
            <Image
                source={require('../assets/plus.png')}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#EA4141' : '#000',
                    // backgroundColor: focused ? '#EA4141' : '#fff',
                }}
            />
        ),
        tabBarButton: (props) => (
            <NewTaskBtn {...props} />
        )
    }

    const HomeStackScreen = () => {
        return (
            <StackNav.Navigator>
                <StackNav.Screen name="Overview" component={HomeScreen} 
                options={{title: "Home", headerTitleAlign: 'center'}}/>
                <StackNav.Screen name="TodaysTasks" component={TodaysTasksScreen} options={{title: "All Tasks", headerTitleAlign: 'center'}}/>
            </StackNav.Navigator>
        )
    }


    // FONTS
    let [fontsLoaded] = useFonts({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }


    return (
        <Tab.Navigator screenOptions={options}>
            {/* <Tab.Screen name="Home" component={HomeScreen} options={homeScreenOptions}/> */}
            <Tab.Screen name="Home" component={HomeStackScreen} options={homeScreenOptions}/>
            <Tab.Screen name="New Task" component={NewTaskScreen} options={newTaskOptions}/>
            {/* <Tab.Screen name="Calendar" component={CalendarScreen} options={calendarScreenOptions} initialParams={{taskList: taskList}}/> */}
            <Tab.Screen name="Calendar" component={CalendarScreen} options={calendarScreenOptions}/>
        </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
    container: {
        // height: 60,
        // paddingVertical: 10
        zIndex: 1000,
    },
    newTaskBtn: {
        backgroundColor: "#fff",    
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top: -10,
        width: 50,
        height: 50,
    },
    newTaskIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        borderColor: "#EA4141",
        borderWidth: 2,
    },
    tabIcon: {
        alignItems: 'center', 
        justifyContent: 'center', 
        // bottom: 10
    }
});
