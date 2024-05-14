import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CountryName from '../CountryName';

jest.mock('i18n-iso-countries', () => ({
    registerLocale: jest.fn(),
    getName: jest.fn((countryCode: string) => {
        switch (countryCode) {
            case 'US':
                return 'United States';
            case 'FR':
                return 'France';
            default:
                return '';
        }
    }),
}));

describe('CountryName', () => {
    it('should display the country name when countryCode is provided', () => {
        render(<CountryName countryCode="US" />);
        expect(screen.getByText('United States')).toBeDefined();
    });

    it('should not display any text when countryCode is null', () => {
        render(<CountryName countryCode={null} />);
        expect(screen.queryByText('United States')).toBeNull();
    });

    it('should apply custom styles if provided', () => {
        const customStyles = {fontSize: 20};
        render(<CountryName countryCode="US" customStyles={customStyles} />);
        const textComponent = screen.getByText('United States');
        expect(textComponent.props.style).toMatchObject(customStyles);
    });
});
