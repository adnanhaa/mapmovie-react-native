import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {apiService} from "../../services/api/apiService";
import {appAction} from "../../_actions/appAction";
import Nav from "./Nav";
import ItemList from "./ItemList";
import Search from "../../components/Search/Search";
import Header from "../../components/Header";
import {StyleSheet, View} from "react-native";

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            suggestions : [],
            renderNav: false,
            renderSearch: false,
            renderList: false,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSuggestions = this.handleSuggestions.bind(this);
    }

    prepareFetchData(value) {
        const {page, filters} = this.props.app;
        if(this.props.app.mode === "view"){
            this.props.fetchDataFor(page, filters.period);
        }else if(this.props.app.mode === "search"){
            if(value !== undefined){
                this.props.searchData(page, value);
            }else{
                this.props.searchData(page, this.props.app.search);
            }
        }
    }

    async handleSearch(value) {
        if(value.length >= 3){
            await this.setPageMode("search");
            await this.props.setSearchValue(value);
            this.prepareFetchData(value);
        }else{
            let reset = await this.setPageMode("view");
            this.setState({suggestions : []});
            if(reset || value.length === 0){
                this.prepareFetchData();
            }
        }
    }

    handleSuggestions(value) {
        if(value.length >= 3){
            apiService.fetchKeywords(value)
                .then(response => response.json())
                .then(data => {
                    let suggestions = data.results.length > 5 ? data.results.slice(0, 5) : data.results;
                    this.setState({suggestions : suggestions});
                });
        }
    }

    setPageMode(mode) {
        if(mode !== this.props.app.mode){
            this.props.setMode(mode);
            return true;
        }
    }

    render(){
        const { search } = this.props.app;

        return <View style={styles.main}>
            {/*empty page header - page can contain own or app header*/}
            <Header/>
            {/*renderNav && */}
            <Nav/>
            {/*renderNav && renderSearch && */}
            <Search
                placeholder={"Search..."}
                value={search}
                handleSearch={this.handleSearch}
                handleSuggestions={ this.handleSuggestions }
                suggestions = {this.state.suggestions}
                timeout={300}
                clear={'clear'}/>
            {/*list pull data from trendStore*/}
            {/*renderNav && renderSearch && renderList && */}
            <ItemList/>
            {/*empty app footer - page can contain own footer*/}
        </View>
    }

    componentDidMount() {
        this.prepareFetchData();
        /*setTimeout(() => {this.setState({renderNav: true})}, 0);
        setTimeout(() => {this.setState({renderSearch: true})}, 0);
        setTimeout(() => {this.setState({renderList: true})}, 0);*/
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.app.page !== this.props.app.page){
            this.prepareFetchData();
        }else{
            if(this.props.app.mode === 'view')
            if(prevProps.app.filters.period !== this.props.app.filters.period){
                this.prepareFetchData();
            }
        }
    }

}

Home.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            page: PropTypes.string
        })
    }),
    location: PropTypes.shape({
        search: PropTypes.string
    }),
    history: PropTypes.shape({
        listen: PropTypes.func.isRequired
    }),
    app : PropTypes.shape({
        page: PropTypes.string,
        mode: PropTypes.string,
        search: PropTypes.string,
        filters: PropTypes.object,
    }).isRequired,
    fetchDataFor: PropTypes.func.isRequired,
    searchData: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    setMode: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        app : state.appReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataFor: (page, period) => dispatch(apiService.fetchDataFor(page, period)),
        searchData: (page, value) => dispatch(apiService.searchData(page, value)),
        setSearchValue: (value) => dispatch(appAction.setSearchValue(value)),
        setMode: (mode) => dispatch(appAction.setMode(mode)),
        setPage: (page) => dispatch(appAction.setPage(page)),
        setFilters: (filters) => dispatch(appAction.setFilters(filters)),
    };
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
    },

    footer: {
        height: 30,
        textAlign: 'center',
        backgroundColor: '#3189ff',
        color: 'white',
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (Home);