import {appAction} from "./appAction";
import {ACTION_SET_MODE, ACTION_SET_PAGE} from "./_actionTypes";

describe('appActions', () => {
    it('should create an action to set page', () => {
        const text = 'show';
        const expectedAction = {
            type: ACTION_SET_PAGE,
            payload : { page : text }
        };
        expect(appAction.setPage(text)).toEqual(expectedAction);
    });
    it('should create an action to set mode', () => {
        const text = 'view';
        const expectedAction = {
            type: ACTION_SET_MODE,
            payload : { mode : text }
        };
        expect(appAction.setMode(text)).toEqual(expectedAction);
    })
});