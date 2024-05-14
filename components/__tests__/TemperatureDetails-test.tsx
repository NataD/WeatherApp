import React from 'react';
import {render, screen} from '@testing-library/react-native';
import TemperatureDetails from '../TemperatureDetails';
import {WeatherCondition} from '@/models/weather';
import {roundTemperature} from '@/utils/displayUtils';

jest.mock('@/utils/displayUtils', () => ({
    roundTemperature: jest.fn().mockReturnValue(25),
}));

describe('TemperatureDetails', () => {
    it('should render the rounded temperature', () => {
        const props = {
            weatherConditions: WeatherCondition.CLEAR,
            temperature: 24.6,
            icon: '01d',
        };

        (roundTemperature as jest.Mock).mockImplementation((temp) => Math.round(temp));

        render(<TemperatureDetails {...props} />);

        expect(screen.getByText('25°')).toBeTruthy();

        expect(roundTemperature).toHaveBeenCalledWith(24.6);
    });
});
