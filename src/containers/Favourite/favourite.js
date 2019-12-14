import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar/navBar';

const styles = require('./styles');

class Favourite extends Component {
    static contextTypes = {
        actions: PropTypes.objectOf(PropTypes.any),
    };

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="Favourite"
                    rightIcon="search"
                    onRightPress={() => {
                        this.context.actions.showSearch(true);
                    }}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Favourite);
