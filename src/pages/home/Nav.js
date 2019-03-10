import React, {Component} from 'react'
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {StyleSheet, View, Text} from "react-native";
import {appAction} from "../../_actions/appAction";

class Nav extends Component {

    getPageStyle(page){
        if(this.props.page === page){
            return [styles.navItemLeft, styles.active];
        }
        return styles.navItemLeft;

    }
    getPeriodStyle(period){
        if(this.props.period === period){
            return [styles.navItemRight, styles.active2];
        }
        return styles.navItemRight;

    }

    render() {
        return <View style={styles.nav}>
            <View style={styles.navLeft}>
                <Text style={this.getPageStyle('shows')}
                      onPress={() => {/*this.props.handleNav('shows');*/this.props.setPage('shows')}}>TV Shows</Text>
                <Text style={this.getPageStyle('movies')}
                      onPress={() => {/*this.props.handleNav('movies'); */this.props.setPage('movies')}}>Movies</Text>
            </View>
            <View style={styles.navRight}>
                <Text
                    style={this.getPeriodStyle('week')}
                    onPress={() => this.props.setFilters({period: 'week'})}>Week</Text>
                <Text
                    style={this.getPeriodStyle('day')}
                    onPress={() => this.props.setFilters({period: 'day'})}>Day</Text>
            </View>
        </View>
    }
}

Nav.propTypes = {
    handleNav : PropTypes.func,
    page : PropTypes.string.isRequired,
    period : PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        page : state.appReducer.page,
        period : state.appReducer.filters.period,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPage : page => dispatch(appAction.setPage(page)),
        setFilters : filters => dispatch(appAction.setFilters(filters)),
    }
};

const styles = StyleSheet.create({
    nav : {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0,
        borderBottomColor: '#c1c1c1',
        marginBottom: 0,
        padding: 5
    },
    navLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: '#3e3e3e',
        borderRadius: 5,
        overflow: 'hidden'
    },
    navRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        backgroundColor: '#dae0e5',
        borderRadius: 5,
        overflow: 'hidden',
        color: '#555555'
    },
    navItemLeft: {
        fontSize: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: '#ffffff'
    },
    navItemRight: {
        fontSize: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    active: {
        backgroundColor: '#212121',
    },
    active2: {
        backgroundColor: '#cfd4d9',
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (Nav);