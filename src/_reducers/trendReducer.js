import {
    ACTION_BEGIN, ACTION_SUCCESS, ACTION_FAILURE
} from "../_actions/_actionTypes";



/*
* TODO: improve loading data with loadedAt time
* There is no need for this store because only one component use this but
* this is implemented to show redux and thunk usability
*/
const initialState = {
    isLoading : false,
    items : [],
    error : null,
    loadedAt : 0
};


function trendReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_BEGIN :
            return  { ...state,
                isLoading: true,
                items : [],
                error: null
            };
        case ACTION_SUCCESS :
            return  { ...state,
                isLoading: false,
                error: null,
                items: action.payload.items,
                loadedAt: Date.now()
        };
        case ACTION_FAILURE :
            return  { ...state,
                isLoading: false,
                error: action.payload.error
        };
        default : return state;
    }
}

export default trendReducer;