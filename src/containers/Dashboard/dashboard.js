import React, { Component } from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    FlatList,
    Image,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { fetchMovies } from '../../store/actions/movie';
import MovieGrid from '../../components/MovieGrid/movieGrid';
import NavBar from '../../components/NavBar/navBar';

const styles = require('./styles');

class Dashboard extends Component {
    static contextTypes = {
        actions: PropTypes.objectOf(PropTypes.any),
    };

    componentDidMount() {
        this.props.fetchMovies({ property: 'popular', page: 1 });
        setTimeout(() => {
            this.props.fetchMovies({ property: 'latest', page: 1 });
        }, 1500);
    }

    render() {
        const popularPageNumber =
            (this.props.movies &&
                this.props.movies.popular &&
                this.props.movies.popular.data &&
                this.props.movies.popular.data.page) ||
            0;
        const popularTotalPage =
            (this.props.movies &&
                this.props.movies.popular &&
                this.props.movies.popular.data &&
                this.props.movies.popular.data.total_pages) ||
            0;
        const latestPageNumber =
            (this.props.movies &&
                this.props.movies.latest &&
                this.props.movies.latest.data &&
                this.props.movies.latest.data.page) ||
            0;
        const latestTotalPage =
            (this.props.movies &&
                this.props.movies.latest &&
                this.props.movies.latest.data &&
                this.props.movies.latest.data.total_pages) ||
            0;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="red" />
                <NavBar
                    title="Home"
                    rightIcon="search"
                    onRightPress={() => {
                        this.context.actions.showSearch(true);
                    }}
                />
                <MovieGrid
                    label="Popular Movies"
                    data={
                        (this.props.movies &&
                            this.props.movies.popular &&
                            this.props.movies.popular.data &&
                            this.props.movies.popular.data.results) ||
                        []
                    }
                    pageNumber={popularPageNumber}
                    onPrevious={() => {
                        this.props.fetchMovies({ property: 'popular', page: popularPageNumber - 1 });
                    }}
                    totalPage={popularTotalPage}
                    onNext={() => {
                        this.props.fetchMovies({ property: 'popular', page: popularPageNumber + 1 });
                    }}
                />

                <MovieGrid
                    label="Latest Movies"
                    data={
                        (this.props.movies &&
                            this.props.movies.latest &&
                            this.props.movies.latest.data &&
                            this.props.movies.latest.data.results) ||
                        []
                    }
                    pageNumber={latestPageNumber}
                    onPrevious={() => {
                        this.props.fetchMovies({ property: 'latest', page: latestPageNumber - 1 });
                    }}
                    totalPage={latestTotalPage}
                    onNext={() => {
                        this.props.fetchMovies({ property: 'latest', page: latestPageNumber + 1 });
                    }}
                />
            </View>
        );
    }
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
        auth: state.auth,
        movies: state.movies,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
