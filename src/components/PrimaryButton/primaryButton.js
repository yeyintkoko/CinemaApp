import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const styles = require('./styles');

export default function PrimaryButton(props) {
    return (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.label}>{props.label}</Text>
        </TouchableOpacity>
    );
}
