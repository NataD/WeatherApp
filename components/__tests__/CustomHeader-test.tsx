import React from 'react';
import {render, screen} from '@testing-library/react-native';

import CustomHeader from '../CustomHeader';

describe('CustomHeader component', () => {
    it('should render the title', () => {
        const title = 'My Custom Title';
        render(<CustomHeader title={title} />);

        expect(screen.getByText(title)).toBeTruthy();

        expect(screen.getByTestId('back-button')).toBeTruthy();
    });
});
