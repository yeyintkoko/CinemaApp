import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = require('./styles');

export default function NavBar(props) {
    return (
        <View style={[styles.nav, props.navBarStyle]}>
            {!!props.leftIcon && (
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => {
                        if (props.onLeftPress) props.onLeftPress();
                    }}
                >
                    <Icon name={props.leftIcon} size={30} color={props.tintColor || '#fff'} />
                </TouchableOpacity>
            )}
            {!!props.onSearch && (
                <TextInput
                    style={styles.searchInput}
                    placeholder={props.title}
                    onChangeText={(text) => {
                        props.onSearch(text);
                    }}
                    autoCorrect={false}
                    autoCompleteType="off"
                />
            )}
            {!props.onSearch && !!props.title && (
                <View style={styles.navHeader}>
                    <Text style={[styles.navTitle, props.tintColor ? { color: props.tintColor } : null]}>
                        {props.title}
                    </Text>
                </View>
            )}
            {!!props.rightIcon && (
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => {
                        if (props.onRightPress) props.onRightPress();
                    }}
                >
                    <Icon name={props.rightIcon} size={30} color={props.tintColor || '#fff'} />
                </TouchableOpacity>
            )}
            {!props.rightIcon && <View style={styles.emptyButton} />}
        </View>
    );
}
