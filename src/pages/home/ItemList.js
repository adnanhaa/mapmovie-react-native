import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {Actions} from "react-native-router-flux";
import Item from "../../components/Item/Item";
import {StyleSheet, ScrollView, View, TouchableHighlight, Text, FlatList} from "react-native";
import Spinner from "../../components/Spinner";

const List = props => {

    const {page} = props.app;
    const {isLoading, error, items} = props.trending;


    if(isLoading){
        return <Spinner/>;
    }

    if(error != null){
        return <Text>{'Oops... '+ error}</Text>;
    }

    return <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) =><Item id={item.id} page= {page} item = {item}/>}/>
};

List.propTypes = {
    trending : PropTypes.shape({
        isLoading: PropTypes.bool,
        error: PropTypes.string,
        items: PropTypes.array.isRequired,
        loadedAt: PropTypes.number,
        string: PropTypes.string,
        url: PropTypes.string,
    }).isRequired,
    app : PropTypes.shape({
        page: PropTypes.string,
        period: PropTypes.string,
    }).isRequired
};


function mapStateToProps(state) {
    return {
        app : state.appReducer,
        trending : state.trendReducer,
    }
}


const styles = StyleSheet.create({
   list: {
       marginHorizontal: 5,
   }
});

export default connect(mapStateToProps) (List);