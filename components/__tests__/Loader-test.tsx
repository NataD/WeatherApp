import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Loader from '../Loader';

describe('Loader component', () => {
    it('should not render when showLoader is false', () => {
        render(<Loader showLoader={false} />);

        expect(screen.queryByTestId('loader')).toBeFalsy();
    });

    it('should render the loader with default overlay color when showLoader is true', () => {
        render(<Loader showLoader={true} />);

        expect(screen.getByTestId('loader')).toBeTruthy();
    });

    it('should render the loader with custom overlay color', () => {
        const customColor = 'rgba(0, 0, 255, 0.5)';
        render(<Loader showLoader={true} overlayColor={customColor} />);

        expect(screen.getByTestId('loader')).toBeTruthy();
    });
});
