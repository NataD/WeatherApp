import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WeatherTable from '../WeatherTable'; // Adjust the import based on your file structure
import {getDayName, roundTemperature} from '@/utils/displayUtils';
import {DailyWeatherDetails} from '@/models/weather';
import {WeatherCondition} from '@/models/weather';

jest.mock('@/utils/displayUtils', () => ({
    getDayName: jest.fn(),
    roundTemperature: jest.fn(),
}));

describe('WeatherTable', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly with given data', () => {
        const mockData: DailyWeatherDetails[] = [
            {
                clouds: {all: 82},
                dt: 1620000000,
                dt_txt: '2024-05-13 21:00:00',
                main: {
                    feels_like: 12.65,
                    grnd_level: 999,
                    humidity: 74,
                    pressure: 1004,
                    sea_level: 1004,
                    temp: 16.97,
                    temp_kf: 0.86,
                    temp_max: 21,
                    temp_min: 16.11,
                },
                pop: 0,
                sys: {pod: 'n'},
                visibility: 10000,
                weather: [{description: 'clear sky', icon: '01d', id: 800, main: WeatherCondition.CLEAR}],
                wind: {deg: 150, gust: 9.33, speed: 3.3},
                rain: null,
            },
            {
                clouds: {all: 90},
                dt: 1620000000,
                dt_txt: '2024-05-14 00:00:00',
                main: {
                    feels_like: 15.77,
                    grnd_level: 997,
                    humidity: 78,
                    pressure: 1003,
                    sea_level: 1003,
                    temp: 16.07,
                    temp_kf: 0.66,
                    temp_max: 21.07,
                    temp_min: 16.41,
                },
                pop: 0,
                sys: {pod: 'n'},
                visibility: 10000,
                weather: [{description: 'clear sky', icon: '01d', id: 800, main: WeatherCondition.CLEAR}],
                wind: {deg: 138, gust: 9.36, speed: 3.06},
                rain: null,
            },
        ];

        (getDayName as jest.Mock).mockImplementation(() => {
            return 'Monday';
        });

        (roundTemperature as jest.Mock).mockImplementation((temp) => Math.round(temp));

        render(<WeatherTable data={mockData} />);

        expect(screen.getByText('High')).toBeTruthy();
        expect(screen.getByText('Low')).toBeTruthy();

        mockData.forEach((forecast) => {
            const dayName = getDayName(forecast.dt);
            expect(screen.getByText(dayName)).toBeTruthy();
            expect(screen.getByText(roundTemperature(forecast.main.temp_max).toString())).toBeTruthy();
            expect(screen.getByText(roundTemperature(forecast.main.temp_min).toString())).toBeTruthy();
        });
    });
});
