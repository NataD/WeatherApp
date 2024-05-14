import React from 'react';
import {render, screen} from '@testing-library/react-native';
import LocationListItem from '../LocationListItem';
import {IFavouriteCity} from '@/store/reducers/sagaSlice';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({push: jest.fn()})),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('LocationListItem component', () => {
    const mockCity: IFavouriteCity = {
        id: '1',
        name: 'Test City',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render city name and remove button', () => {
        render(<LocationListItem city={mockCity} />);

        expect(screen.getByText(mockCity.name)).toBeTruthy();
        expect(screen.getByTestId('remove-btn')).toBeTruthy();
    });
});
