import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        backgroundColor: 'red',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    navHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    navButton: {
        alignSelf: 'center',
        padding: 8,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    emptyButton: {
        width: 35,
    },
});
