import React from 'react';
import {shallow} from 'enzyme';
import Search from "./Search";


describe('Search', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Search debug />);
        expect(component).toMatchSnapshot();
    });

    it('should render correctly with no props', () => {
        const component = shallow(<Search/>);
        expect(component).toMatchSnapshot();
    });

    it('should render banner text correctly with given strings', () => {
        const string = 'one';
        const component = shallow(<Search text={string} />);
        expect(component).toMatchSnapshot();
    });

});