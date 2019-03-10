import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {apiService} from "../../services/api/apiService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import {StyleSheet, Image, Text, View, WebView} from "react-native";
import {ApiConstants} from "../../services/api/apiConstants";

class Details extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            item : null,
            videos : [],
            error : null
        }
    }
    componentDidMount(){
        const { page, id } = this.props;
        let promise = apiService.fetchItemDetails(page, id);
        if(promise !== null){
            promise
                .then(this.handleErrors)
                .then(data => {
                    this.setState({isLoading : false, error : false, item : data});
                })
                .catch(error =>{
                    this.setState({isLoading : false, error : error.message, item : null});
                });
        }else {
            this.setState({error : true, isLoading : false});
        }


        let videoPromise = apiService.fetchItemVideos(page, id);
        if(videoPromise !== null){
            videoPromise
                .then(this.handleErrors)
                .then(data => {
                    this.setState({videos : data.results});
                })
        }
    }
    handleErrors(response) {
        if (response.status_message){
            throw Error(response.status_message);
        }
        return response;
    }
    render(){
        return <View style={styles.detailsMain}>
            {/*empty app header - page can contain own header*/}
            <Header/>
            {this.getContent()}
            {/*empty app footer - page can contain own footer*/}
            <Footer/>
        </View>
    }
    getContent(){

        const {isLoading, item, error} = this.state;

        if(isLoading) {
            return <View><Spinner text={'Loading...'}/></View>
        }else if(error) {
            return <View><Text>{'Oops... ' + error}</Text></View>
        }else{
            if(item !== null) {
                return<View style={styles.card}>
                    {this.getImgOrVideo()}
                    <View>
                        <Text style={styles.cardTitle}>{item.title === undefined ? item.name : item.title}</Text>
                        <Text style={styles.cardText}>{item.overview}</Text>
                    </View>
                </View>
            }else{
                return <View><Text>{'Oops... Something went wrong... please refresh'}</Text></View>
            }
        }
    }
    getImgOrVideo() {
        if(this.state.videos.length > 0 && this.state.videos[0] !== undefined){
            return this.getVideo();
        }
        return this.getImg();
    }
    getVideo() {
        const video = this.state.videos[0];
        let source = {
            html: "<html><body style='margin:0; padding:0'><iframe src='"+ this.getVideoUrl(video) +"' frameBorder='0' allowFullScreen='1' width='100%' height='100%'/></body></html>"
        };

        return <View style={{width:'100%', height: 240, overflow: 'hidden',}}>
            <WebView
                style={styles.webView}
                javaScriptEnabled={true}
                source={source}
        /></View>;
    }
    getVideoUrl(video) {
        switch(video.site){
            case "YouTube" : return 'https://www.youtube.com/embed/'
                +video.key+'?autoplay=1';/*  // &enablejsapi=1&showinfo=0&controls=1&fs=1&wmode=transparent&amp;origin=http%3A%2F%2Flocalhost*/
        }
        return "";
    }
    getImg() {
        const {item} = this.state;
        let src = item.backdrop_path === null ? item.poster_path : item.backdrop_path;
        let fullPath = ApiConstants.IMAGE_BASE_URL + src;
        if(src == null){
            fullPath = "/img/noimage.jpg";
        }
        let source = {
            url : fullPath
        };
        return <Image source={source}/>;
    }
}

Details.propTypes = {
    page: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    detailsMain: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        height: '100%',
        backgroundColor: 'white',
    },
    webview: {
        width:'100%',
        height: 240,
        borderRadius:5,
    },
    card: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#c1c7cc',
        margin: 5,
        padding: 0,
        borderRadius: 5,
        overflow: 'hidden',

    },
    cardTitle: {
        marginTop: 10,
        padding: 8,
        fontSize: 19,
        textAlign: 'left',
    },
    cardText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'left',
    },

});

export default Details;