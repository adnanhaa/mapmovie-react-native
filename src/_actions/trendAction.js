export const trendAction = {
    fetchTrendingBegin,
    fetchTrendingSuccess,
    fetchTrendingFailure
};


function fetchTrendingBegin(){
    return {
        type: "ACTION_BEGIN",
    }
}
function fetchTrendingSuccess(items){
    return {
        type: "ACTION_SUCCESS",
        payload : {items}
    }
}
function fetchTrendingFailure(error){
    return {
        type: "ACTION_FAILURE",
        payload : {error}
    }
}