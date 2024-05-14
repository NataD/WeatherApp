import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WeatherDetailsCard, {IWeatherCardType} from '../WeatherDetailsCard';

jest.mock('@/assets/images/wind-icon.png', () => 'WindIcon');
jest.mock('@/assets/images/visibility-icon.png', () => 'VisibilityIcon');
jest.mock('@/assets/images/humidity-icon.png', () => 'HumidityIcon');
jest.mock('@/assets/images/rain-icon.png', () => 'RainIcon');

describe('WeatherDetailsCard', () => {
    it('should render correct details for wind', () => {
        render(<WeatherDetailsCard type={IWeatherCardType.WIND} value={5} />);

        expect(screen.getByText('Wind')).toBeTruthy();
        expect(screen.getByText('5 m/s')).toBeTruthy();
        expect(screen.getByTestId('weather-icon').props.source).toEqual('WindIcon');
    });

    it('should render correct details for visibility', () => {
        render(<WeatherDetailsCard type={IWeatherCardType.VISIBILITY} value={10} />);

        expect(screen.getByText('Visibility')).toBeTruthy();
        expect(screen.getByText('10 km')).toBeTruthy();
        expect(screen.getByTestId('weather-icon').props.source).toEqual('VisibilityIcon');
    });

    it('should render "-" when value is null', () => {
        render(<WeatherDetailsCard type={IWeatherCardType.HUMIDITY} value={null} />);

        expect(screen.getByText('Humidity')).toBeTruthy();
        expect(screen.getByText('- %')).toBeTruthy();
    });
});
