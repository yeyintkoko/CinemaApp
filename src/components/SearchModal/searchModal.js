import React, { useState } from 'react';
import { SafeAreaView, View, Text, Modal } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../NavBar/navBar';
import MovieGrid from '../MovieGrid/movieGrid';
import { fetchMovies } from '../../store/actions/movie';

const styles = require('./styles');

function SearchModal(props) {
    const [searchKey, setSearchKey] = useState('');
    const searchPageNumber =
        (props.movies && props.movies.search && props.movies.search.data && props.movies.search.data.page) || 0;
    const searchTotalPage =
        (props.movies && props.movies.search && props.movies.search.data && props.movies.search.data.total_pages) || 0;

    return (
        <Modal animationType="fade" visible={props.showSearch}>
            <SafeAreaView style={styles.container}>
                <NavBar
                    navBarStyle={styles.navBar}
                    tintColor="#ccc"
                    title="Search Movies"
                    leftIcon="arrow-back"
                    onLeftPress={() => {
                        props.onBackPress();
                    }}
                    onSearch={(text) => {
                        setSearchKey(text);
                        setTimeout(() => {
                            props.fetchMovies({ property: 'search', query: encodeURIComponent(text), page: 1 });
                        }, 1500);
                    }}
                />
                <MovieGrid
                    label={`Search Movies ${searchKey ? ` (${searchKey})` : ''}`}
                    data={
                        (props.movies &&
                            props.movies.search &&
                            props.movies.search.data &&
                            props.movies.search.data.results) ||
                        []
                    }
                    pageNumber={searchPageNumber}
                    onPrevious={() => {
                        props.fetchMovies({
                            property: 'search',
                            query: searchKey,
                            page: searchPageNumber - 1,
                        });
                    }}
                    totalPage={searchTotalPage}
                    onNext={() => {
                        props.fetchMovies({
                            property: 'search',
                            query: searchKey,
                            page: searchPageNumber + 1,
                        });
                    }}
                />
            </SafeAreaView>
        </Modal>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovies: (payload) => {
            dispatch(fetchMovies(payload));
        },
    };
}

function mapStateToProps(state) {
    return {
        movies: state.movies,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchModal);
