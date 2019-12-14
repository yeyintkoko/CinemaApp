import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../containers/Dashboard/dashboard';
import Profile from '../containers/Profile/profile';
import Chat from '../containers/Chat/chat';
import Favourite from '../containers/Favourite/favourite';
import Notification from '../containers/Notification/notification';
import Signin from '../containers/Signin/signin';

export const MainTabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: Dashboard,
            navigationOptions: ({ screenProps }) => {
                return {
                    title: 'Home',
                    tabBarIcon: (params) => {
                        return <Icon name="home" size={25} color={params.tintColor} />;
                    },
                };
            },
        },
        Chat: {
            screen: Chat,
            navigationOptions: ({ screenProps }) => {
                return {
                    title: 'Chat',
                    tabBarIcon: (params) => {
                        return <Icon name="chat-bubble-outline" size={25} color={params.tintColor} />;
                    },
                };
            },
        },
        Favourite: {
            screen: Favourite,
            navigationOptions: ({ screenProps }) => {
                return {
                    title: 'Favourite',
                    tabBarIcon: (params) => {
                        return <Icon name="bookmark-border" size={25} color={params.tintColor} />;
                    },
                };
            },
        },
        Notification: {
            screen: Notification,
            navigationOptions: ({ screenProps }) => {
                return {
                    title: 'Notification',
                    tabBarIcon: (params) => {
                        return <Icon name="notifications-none" size={25} color={params.tintColor} />;
                    },
                };
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: ({ screenProps }) => {
                return {
                    title: 'Profile',
                    tabBarIcon: (params) => {
                        return <Icon name="perm-identity" size={25} color={params.tintColor} />;
                    },
                };
            },
        },
    },
    {
        initialRouteName: 'Home',
        activeColor: 'red',
        inactiveColor: 'rgba(0,0,0,0.4)',
        barStyle: { backgroundColor: '#fff' },
        cardShadowEnabled: false,
    },
);

export const MainStackNavigator = createStackNavigator(
    {
        Signin: {
            screen: Signin,
            navigationOptions: () => {
                return {
                    header: null,
                };
            },
        },
        Main: {
            screen: MainTabNavigator,
            navigationOptions: ({ screenProps }) => {
                return {
                    header: null,
                };
            },
        },
    },
    {
        initialRouteName: 'Signin',
        defaultNavigationOptions: () => {
            return {
                headerStyle: {
                    elevation: 0,
                },
            };
        },
    },
);
