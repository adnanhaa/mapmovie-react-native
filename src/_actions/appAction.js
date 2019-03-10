export const appAction = {
    setPage,
    setMode,
    setFilters,
    setSearchValue
};


function setPage(page){
    return {
        type: "ACTION_SET_PAGE",
        payload : {page}
    }
}
function setMode(mode){
    return {
        type: "ACTION_SET_MODE",
        payload : {mode}
    }
}
function setSearchValue(value){
    return {
        type: "ACTION_SET_SEARCH_VALUE",
        payload : {value}
    }
}
function setFilters(filters){
    return {
        type: "ACTION_SET_FILTERS",
        payload : {filters}
    }
}
