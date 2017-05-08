import {
    StyleSheet,
} from 'react-native'

const IdleStyles = StyleSheet.create({
    View: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        fontSize: 16
    }
})

const PullingStyle = StyleSheet.create({
    View: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        fontSize: 16
    },
})

const RefreshingStyle = StyleSheet.create({
    View: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        fontSize: 16
    }
})
export const StateStyle = {"Idle":IdleStyles, "Pulling":PullingStyle, "Refreshing": RefreshingStyle}