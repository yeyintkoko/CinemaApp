import { StyleSheet, Dimensions } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
    },
    movies: {
        paddingLeft: 12,
        alignItems: 'center',
        paddingBottom: 15,
    },
    movie: {
        width: Dimensions.get('window').width / 3.5,
        marginRight: 12,
        marginBottom: 12,
    },
    movieImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    movieTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        padding: 5,
        backgroundColor: '#000',
    },
    label: {
        fontWeight: '500',
        fontSize: 20,
        color: 'rgba(0,0,0,0.8)',
        marginTop: 15,
        marginBottom: 10,
        paddingLeft: 12,
    },
    paging: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    pageButton: {
        padding: 10,
    },
    pageButtonText: {
        color: 'brown',
        fontSize: 16,
        fontWeight: '500',
    },
    pageNumber: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.8)',
    },
    dimText: {
        color: 'rgba(0,0,0,0.3)',
    },
});
