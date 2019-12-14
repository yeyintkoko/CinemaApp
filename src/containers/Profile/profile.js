import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import NavBar from '../../components/NavBar/navBar';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import { USER_DATA } from '../../constants';

const styles = require('./styles');

class Profile extends Component {
    static contextTypes = {
        actions: PropTypes.objectOf(PropTypes.any),
    };

    clearAndLogoutUser() {
        this.context.actions.showLoading('Logging out ...');

        const data = { ...this.props.auth, loggedIn: false };
        // AsyncStorage.removeItem(USER_DATA)
        AsyncStorage.setItem(USER_DATA, JSON.stringify(data))
            .then(() => {
                this.context.actions.setUser(null);
                this.context.actions.showLoading(false);
                this.props.navigation.replace('Signin');
            })
            .catch((err) => {
                this.context.actions.showLoading(false);
                Alert.alert('Error', err.message);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar title="Profile" />
                {!!this.props.auth && (
                    <View style={styles.content}>
                        <Text style={styles.label}>Full name</Text>
                        <Text style={styles.value}>{this.props.auth.fullname}</Text>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{this.props.auth.email}</Text>
                        <View style={styles.emptyGap} />
                        <PrimaryButton
                            label="Logout"
                            onPress={() => {
                                this.clearAndLogoutUser();
                            }}
                        />
                    </View>
                )}
                {!this.props.auth && (
                    <View style={styles.content}>
                        <View style={styles.emptyGap} />
                        <PrimaryButton
                            label="Login"
                            onPress={() => {
                                this.props.navigation.replace('Signin');
                            }}
                        />
                        <View style={styles.emptyGap} />
                    </View>
                )}
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
)(Profile);
