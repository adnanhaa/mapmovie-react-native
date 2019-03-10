import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, Text, View} from "react-native";

/*
* local component - only for Search
*/
function Suggestions (props) {

    if(props.words === undefined){
        return<div/>;
    }

    return <View style={styles.suggestions}>
        {props.words.map(word =>{
            return <Text key={word.id}
                         style={styles.suggestionsItem}
                       onPress={()=> props.onItemClickHandler(word.name)}>
                {word.name}
            </Text>
        })}
    </View>
}

Suggestions.propTypes = {
    words : PropTypes.array,
    onItemClickHandler : PropTypes.func
};

const styles = StyleSheet.create({
    suggestions: {

    },
    suggestionsItem: {
        paddingVertical: 7,
        paddingHorizontal: 12,
        fontSize: 18,
        color: '#a7a7a7',
        borderTopWidth: 1,
        borderTopColor: '#ebebeb'
    }
});

export default Suggestions