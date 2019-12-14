import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const styles = require('./styles');

export default function TextBox(props) {
    return (
        <View style={styles.container}>
            <Text style={[styles.label, props.error ? styles.errorLabel : null]}>{props.label}</Text>
            <TextInput
                ref={(ref) => {
                    if (props.onRef) props.onRef(ref);
                }}
                style={[styles.textInput, props.error ? styles.errorTextInput : null]}
                {...props}
            />
            {props.error && <Text style={styles.error}>{props.error}</Text>}
        </View>
    );
}
