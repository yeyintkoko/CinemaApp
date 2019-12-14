import { StyleSheet, Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');
const isIos = Platform.OS === 'ios';

module.exports = StyleSheet.create({
    container: {
        width: window.width,
        height: (isIos && window.height - 20) || window.height,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
    },
    title: {
        fontWeight: '500',
        fontSize: 26,
        color: 'rgba(0,0,0,0.7)',
        marginBottom: 25,
    },
    buttonGap: {
        height: 30,
    },
    footer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpText: {},
    loginLink: {
        padding: 10,
    },
    loginText: {
        color: 'red',
    },
    skipLink: {
        padding: 15,
        marginRight: 15,
        alignSelf: 'flex-end',
    },
    skipText: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.5)',
    },
});
