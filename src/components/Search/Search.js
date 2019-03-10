import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, Text, TextInput, View} from "react-native";
import Suggestions from "./Suggestions";

const DEFAULT_TIMEOUT = 500;
const MIN_CHARS = 1;

/*
* Search component - stateful component
* prepared for reusebilty
* TODO create defaultProps after rubicon review - there is no time now
* TODO improve component and export to npm package
*/
class Search extends Component{

    constructor(props){
        super(props);
        this.timeout = 0;

        this.state = {
            value : this.props.value,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSuggestions = this.handleSuggestions.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
    }

    getActivityStyle() {
        if(this.state.value === undefined){
            return [styles.searchHolder, styles.neutral];
        }
        if(this.state.value.length === 0){
            return [styles.searchHolder, styles.neutral];
        }else if(this.state.value.length < 3){
            return [styles.searchHolder, styles.inactive];
        }else if(this.state.value.length >= 3){
            return [styles.searchHolder, styles.active];
        }
    }

    getClear() {
        if(this.state.value === undefined || this.state.value.length === 0) return;
        return <Text style={styles.clear}
                     onPress={this.clearHandler}>
            {this.props.clear}
            </Text>;
    }

    clearHandler() {
        this.setState({value : ''});
        this.props.handleSearch('');
    }

    componentDidMount(){
        if (this.state.value !== undefined && this.state.value.length >= 3){
            this.handleSuggestions(this.state.value);
        }
    }

    handleChange(value) {
        this.setState({value : value});

        if(this.props.handleSearch === undefined) return;

        if(value !== undefined && this.checkChars(value.length)){

            if(this.isTimeout()){
                this.handleTimeout(value);
            }else{
                this.props.handleSearch(value);
            }
        }

    }

    handleSuggestions(value) {
        if(this.props.handleSuggestions !== undefined){
            this.props.handleSuggestions(value);
        }
    }

    handleSuggestionClick(value) {
        this.setState({value : value});
        this.props.handleSearch(value);
        this.handleSuggestions(value);
    }

    handleTimeout(value) {
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.handleSearch(value);
            this.handleSuggestions(value);
        }, this.getTimeout());
    }

    isTimeout() {
        return this.props.timeout !== undefined;
    }
    getTimeout() {
        if(this.props.timeout !== undefined){
            return this.props.timeout;
        }
        return DEFAULT_TIMEOUT;
    }


    checkChars(length) {
        if(this.props.minChars !== undefined) {
            return length >= this.props.minChars;
        }
        return length >= MIN_CHARS;
    }

    render() {
        return (<View style={this.getActivityStyle()}>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.input}
                            value={this.state.value}
                            placeholder={this.props.placeholder}
                            onChangeText={(text) => this.handleChange(text)}
                        />
                        {this.getClear()}
                    </View>
                    <Suggestions
                        words={this.props.suggestions}
                        onItemClickHandler={this.handleSuggestionClick}
                    />
                </View>
        );
    }



}

//TODO improve this with defaults
Search.propTypes = {
    value : PropTypes.string,
    placeholder : PropTypes.string,
    handleSearch : PropTypes.func,
    handleSuggestions : PropTypes.func,
    timeout : PropTypes.number,
    minChars : PropTypes.number,
    suggestions : PropTypes.array,
    clear : PropTypes.string
};

const styles = StyleSheet.create({
    searchHolder: {
        marginHorizontal: 5,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    searchBox: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    neutral: {
        borderWidth: 1,
        borderColor: '#c1c1c1',
    },
    active: {
        borderWidth: 2,
        borderColor: '#1ec500',
    },
    inactive: {
        borderWidth: 2,
        borderColor: '#ff0000',
    },
    input: {
        flex: 7,
        height: 40,
        paddingLeft: 8,
        fontSize: 18,
        textAlign: 'left'
    },
    clear: {
        flex: 1,
        height: 40,
        fontSize: 15,
        color: '#555555',
        paddingHorizontal: 8,
        alignSelf: 'flex-end',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default Search;