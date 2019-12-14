import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        color: 'rgba(0,0,0,0.6)',
        marginBottom: 7,
        fontSize: 16,
    },
    errorLabel: {
        color: 'red',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        height: 42,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    errorTextInput: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginTop: 4,
    },
});
