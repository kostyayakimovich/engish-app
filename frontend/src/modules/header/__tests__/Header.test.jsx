import React from "react";
import { Provider } from 'react-redux';
import Header from "../Header";
import { render } from '@testing-library/react';
import {store} from '../../../store/store'

describe("Header component", () => {
    it('should render the header', () => {
        const { getByText } = render(
          <Provider store={store}>
            <Header />
          </Provider>
        );    
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByText('Logout')).toBeInTheDocument(); 
    });
});