import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function Header() {
    return (
    <View style={styles.container}>
        <StatusBar style="auto" /> 
        <Text style={styles.header}>
            T
            <Text style={styles.headerSubtext}>
                asker
            </Text>
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        height: 85,
        // height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        // SHADOW
        shadowColor: '#CECECE',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 10,
    },
    header: {
        fontSize: 20,
        marginTop: 10,
        lineHeight: 100,
        color: "#EA4141"
    },
    headerSubtext: {
        color: "#000"
    }
});