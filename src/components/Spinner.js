import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, Text, View} from "react-native";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PulseIndicator,
    SkypeIndicator, UIActivityIndicator, WaveIndicator
} from "react-native-indicators";

const Spinner = (props) => {
    return <View style={styles.spinnerHolder}>
                <View style={styles.spinners}>
                    <WaveIndicator waveFactor={0.5} color="#007bff"/>
                    <WaveIndicator waveFactor={0.5} color="#6c757d"/>
                    <WaveIndicator waveFactor={0.5} color="#28a745"/>
                    <WaveIndicator waveFactor={0.5} color="#dc3545"/>
                    <WaveIndicator waveFactor={0.5} color="#ffc107"/>
                </View>
                <Text> {props.text} </Text>
            </View>

};

Spinner.defaultProps = {
    text : 'Loading...'
};
Spinner.propTypes = {
    text : PropTypes.string
};

const styles = StyleSheet.create({
    spinnerHolder: {
        flexDirection: 'column',
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    spinners: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 17,
    }
});

export default Spinner;