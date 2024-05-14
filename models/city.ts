import {Cloud, Coordinates, MainWeatherDetails, Precipitation, SystemDetails, Weather, WindDetails} from '@/models/weather';

export type CityItem = {
    id: number;
    name: string;
    coord: Coordinates;
    main: MainWeatherDetails;
    dt: number;
    wind: WindDetails;
    sys: SystemDetails;
    rain: Precipitation | null;
    snow: Precipitation | null;
    clouds: Cloud;
    weather: Weather[];
};

export type CityResponse = {
    message: string;
    cod: string;
    count: number;
    list: CityItem[];
};
