import React, { useState } from 'react';
import { ActivityIndicator, View, Text, Modal } from 'react-native';

const styles = require('./styles');

export default function Loading(props) {
    return (
        <Modal animationType="fade" transparent visible={props.showLoading}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.title}</Text>
                <ActivityIndicator size="large" color="#ccc" />
            </View>
        </Modal>
    );
}
