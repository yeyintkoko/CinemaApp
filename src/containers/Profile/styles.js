import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 22,
        paddingVertical: 15,
    },
    label: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.7)',
        marginBottom: 8,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.7)',
        marginBottom: 20,
    },
    emptyGap: {
        flex: 1,
    },
});
