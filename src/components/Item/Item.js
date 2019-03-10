import {ApiConstants} from "../../services/api/apiConstants";
import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, View, Text, Image, TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";

const Item = props => {

    const { page, item } = props;

    let src = item.backdrop_path === null ? item.poster_path : item.backdrop_path;
    let fullPath = ApiConstants.IMAGE_BASE_URL + src;

    if(src == null){
        fullPath = "/img/noimage.jpg";
    }
    let pic = {
        uri: fullPath
    };

    return <TouchableHighlight
        style={styles.item}
        key={item.id}
        onPress={() => Actions.details({page: page, id: item.id})}>
        <View>
            <Image source={pic} style={styles.itemImage}/>
            <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{item.title === undefined ? item.name : item.title}</Text>
            </View>
        </View>
    </TouchableHighlight>;
};

Item.propTypes = {
    page : PropTypes.string.isRequired,
    item : PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    item: {
        marginBottom: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#b1b1b1',
        borderRadius:6,
    /*    shadowColor: '#ff0000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,*/
    },

    itemBody: {
        margin: 0,
        padding: 0,
    },

    itemTitle: {
        paddingVertical: 8,
        fontSize: 19,
        textAlign: 'center',
    },

    itemImage : {
        width: '100%',
        height: 200,
    }
});

export default Item;