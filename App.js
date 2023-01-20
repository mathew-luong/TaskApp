import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
// import MyTabBar from './Screens/NewTaskScreen';
import MyTabBar from './components/MyTabBar';
import React from 'react';
import TaskProvider from './shared/TaskProvider';

export default function App() {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" /> 
            {/* <Header/> */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={styles.container}>
                <TaskProvider>
                    <NavigationContainer>
                        <MyTabBar/>
                    </NavigationContainer>
                </TaskProvider>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        position: 'absolute',
        bottom: 20,
        height: 50,
        width: 60,  
        left: 165,
        backgroundColor: "grey"
    }
});
