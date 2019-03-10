import {ACTION_SUCCESS} from "./_actionTypes";
import {trendAction} from "./trendAction";

describe('appActions', () => {
    it('should create an action to set items', () => {
        const array = [];
        const expectedAction = {
            type: ACTION_SUCCESS,
            payload : { items : array }
        };
        expect(trendAction.fetchTrendingSuccess(array)).toEqual(expectedAction);
    });
});