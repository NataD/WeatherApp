import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CityListItem from '../CityListItem';
import {CityItem} from '@/models/city';
import {WeatherCondition} from '@/models/weather';

describe('CityListItem', () => {
    const mockCity: CityItem = {
        name: 'Warsaw',
        sys: {country: 'PL'},
        id: 756135,
        coord: {lat: 52.2298, lon: 21.0118},
        main: {feels_like: 18.75, humidity: 26, pressure: 1016, temp: 20.01, temp_max: 20.68, temp_min: 19.34},
        dt: 1715614437,
        wind: {deg: 90, speed: 2.57},
        rain: null,
        snow: null,
        clouds: {all: 0},
        weather: [{description: 'clear sky', icon: '01d', id: 800, main: WeatherCondition.CLEAR}],
    };

    it('renders the city name', () => {
        render(<CityListItem city={mockCity} />);

        expect(screen.getByText('Warsaw')).toBeTruthy();
    });
});
