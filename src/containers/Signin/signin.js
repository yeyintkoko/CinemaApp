import React, { Component } from 'react';
import { StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from '../../components/TextInput/textInput';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_DATA } from '../../constants';

const styles = require('./styles');
const isIos = Platform.OS === 'ios';

function validateEmail(email) {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Signin extends Component {
    state = {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
        user: null,
        showLogin: false,
    };

    static contextTypes = {
        actions: PropTypes.objectOf(PropTypes.any),
    };

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        AsyncStorage.getItem(USER_DATA)
            .then((value) => {
                if (!value) return;

                const user = JSON.parse(value);
                if (user.loggedIn) {
                    this.context.actions.setUser(user);
                    this.props.navigation.replace('Main');
                } else {
                    this.setState((prevState) => {
                        return { user, showLogin: true };
                    });
                }
            })
            .catch((err) => {
                return null;
            });
    }

    loginUser() {
        this.validateForm()
            .then((valid) => {
                if (!valid) return;

                if (!this.state.user) {
                    return Alert.alert('Error', 'No such user exists');
                }

                if (this.state.email === this.state.user.email && this.state.password === this.state.user.password) {
                    const data = { loggedIn: true, ...this.state.user };
                    AsyncStorage.setItem(USER_DATA, JSON.stringify(data))
                        .then(() => {
                            this.context.actions.setUser(data);
                            this.props.navigation.replace('Main');
                        })
                        .catch((err) => {
                            Alert.alert('Error', err.message);
                        });
                } else {
                    Alert.alert('Error', 'Invalid email or password');
                }
            })
            .catch((err) => {
                this.context.actions.showLoading(false);
                Alert.alert('Error', err.message);
            });
    }

    signUpUser() {
        this.validateForm()
            .then((valid) => {
                if (!valid) return;

                this.context.actions.showLoading('Saving user info ...');
                const data = {
                    fullname: this.state.fullname,
                    email: this.state.email,
                    password: this.state.password,
                };
                AsyncStorage.setItem(USER_DATA, JSON.stringify(data))
                    .then(() => {
                        this.context.actions.setUser(data);
                        this.props.navigation.replace('Main');
                    })
                    .catch((err) => {
                        Alert.alert('Error', err.message);
                    });
                this.context.actions.showLoading(false);
            })
            .catch((err) => {
                this.context.actions.showLoading(false);
                Alert.alert('Error', err.message);
            });
    }

    validateForm() {
        return new Promise((resolve, reject) => {
            let valid = true;
            this.setState(
                (prevState) => {
                    let { error } = prevState;

                    if (!prevState.showLogin && !prevState.fullname) {
                        error = error || {};
                        error.fullname = 'Enter your name';
                        valid = false;
                    }

                    if (!prevState.email) {
                        error = error || {};
                        error.email = 'Enter your email';
                        valid = false;
                    } else if (!validateEmail(prevState.email)) {
                        error = error || {};
                        error.email = 'Invalid email address';
                        valid = false;
                    }

                    if (!prevState.password) {
                        error = error || {};
                        error.password = 'Enter password';
                        valid = false;
                    } else if (prevState.password.length < 6) {
                        error = error || {};
                        error.password = 'Require minimum 6 characters';
                        valid = false;
                    }

                    if (!prevState.showLogin && !prevState.confirmPassword) {
                        error = error || {};
                        error.confirmPassword = 'Enter confirm password';
                        valid = false;
                    } else if (!prevState.showLogin && prevState.password !== prevState.confirmPassword) {
                        error = error || {};
                        error.confirmPassword = 'Password and confirm password do not match';
                        valid = false;
                    }

                    if (!valid) {
                        return { error };
                    }
                    return { error: null };
                },
                () => {
                    resolve(valid);
                },
            );
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.skipLink}
                        onPress={() => {
                            this.setState((prevState) => {
                                return {
                                    fullname: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    error: null,
                                };
                            });
                            this.props.navigation.replace('Main');
                        }}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Text style={styles.title}>{this.state.showLogin ? 'Log In' : 'Sign Up'}</Text>
                        {!this.state.showLogin && (
                            <TextInput
                                onRef={(ref) => {
                                    this.txtFullname = ref;
                                }}
                                label="Fullname"
                                value={this.state.fullname}
                                autoCorrect={false}
                                autoCompleteType="off"
                                onChangeText={(text) => {
                                    this.setState((prevState) => {
                                        return { fullname: text, error: null };
                                    });
                                }}
                                onSubmitEditing={() => {
                                    this.txtEmail.focus();
                                }}
                                returnKeyType="next"
                                error={this.state.error && this.state.error.fullname}
                            />
                        )}
                        <TextInput
                            onRef={(ref) => {
                                this.txtEmail = ref;
                            }}
                            label="Email"
                            value={this.state.email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(text) => {
                                this.setState((prevState) => {
                                    return { email: text, error: null };
                                });
                            }}
                            onSubmitEditing={() => {
                                this.txtPassword.focus();
                            }}
                            returnKeyType="next"
                            error={this.state.error && this.state.error.email}
                        />
                        <TextInput
                            onRef={(ref) => {
                                this.txtPassword = ref;
                            }}
                            label="Password"
                            value={this.state.password}
                            secureTextEntry
                            keyboardType={isIos ? 'default' : 'visible-password'}
                            onChangeText={(text) => {
                                this.setState((prevState) => {
                                    return { password: text, error: null };
                                });
                            }}
                            onSubmitEditing={() => {
                                if (this.state.showLogin) {
                                    this.loginUser();
                                } else {
                                    this.txtConfirmPassword.focus();
                                }
                            }}
                            returnKeyType="next"
                            error={this.state.error && this.state.error.password}
                        />
                        {!this.state.showLogin && (
                            <TextInput
                                onRef={(ref) => {
                                    this.txtConfirmPassword = ref;
                                }}
                                label="Confirm password"
                                value={this.state.confirmPassword}
                                onChangeText={(text) => {
                                    this.setState((prevState) => {
                                        return { confirmPassword: text, error: null };
                                    });
                                }}
                                secureTextEntry
                                keyboardType={isIos ? 'default' : 'visible-password'}
                                onSubmitEditing={() => {
                                    this.signUpUser();
                                }}
                                returnKeyType="done"
                                error={this.state.error && this.state.error.confirmPassword}
                            />
                        )}
                        <View style={styles.buttonGap} />
                        <PrimaryButton
                            label={this.state.showLogin ? 'Log In' : 'Sign Up'}
                            onPress={() => {
                                if (this.state.showLogin) {
                                    this.loginUser();
                                } else {
                                    this.signUpUser();
                                }
                            }}
                        />
                        <View style={styles.footer}>
                            <Text style={styles.helpText}>
                                {this.state.showLogin ? "Don't have an account?" : 'Already have an account?'}
                            </Text>
                            <TouchableOpacity
                                style={styles.loginLink}
                                onPress={() => {
                                    this.setState((prevState) => {
                                        return {
                                            showLogin: !prevState.showLogin,
                                            fullname: '',
                                            email: '',
                                            password: '',
                                            confirmPassword: '',
                                            error: null,
                                        };
                                    });
                                }}
                            >
                                <Text style={styles.loginText}>{this.state.showLogin ? 'Sign Up' : 'Login'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
)(Signin);
