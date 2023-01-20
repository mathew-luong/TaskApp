import { StyleSheet, Text, View } from 'react-native';


export default function CalendarTask(props) {
    return (
    <View style={styles.container}>
        <Text style={styles.header} numberOfLines={1} ellipsizeMode="tail">
            {props.text}
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EA4141",
        height: 40,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 6,
        // alignSelf: 'center',
        // flex: 1,
        // backgroundColor: "#fff",
        // borderRadius: 15,
        // padding: 10,
        // marginVertical: 10,
        // shadowColor: '#CECECE',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.5,
        // shadowRadius: 10,  
        // elevation: 10,
        // width: '100%'
    },
    header: {
        fontSize: 15,
        color: "#FFF"
        // color: '#000'
    },
});