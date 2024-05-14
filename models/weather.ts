export enum WeatherCondition {
    CLEAR = 'Clear',
    CLOUDS = 'Clouds',
    RAIN = 'Rain',
    SNOW = 'Snow',
    DRIZZLE = 'Drizzle',
    THUNDERSTORM = 'Thunderstorm',
    MIST = 'Mist',
    SMOKE = 'Smoke',
    HAZE = 'Haze',
    DUST = 'Dust',
    FOG = 'Fog',
    SAND = 'Sand',
    ASH = 'Ash',
    SQUALL = 'Squall',
    TORNADO = 'Tornado',
}

export type Coordinates = {
    lat: number;
    lon: number;
};

export type MainWeatherDetails = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
};

export type WindDetails = {
    speed: number;
    deg: number;
    gust?: number;
};

export type SystemDetails = {
    country: string;
};

export type Precipitation = {
    '1h': number;
    '3h': number;
};

export type Cloud = {
    all: number;
};

export type Weather = {
    id: number;
    main: WeatherCondition;
    description: string;
    icon: string;
};

export type WeatherSys = {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
};

export type CurrentWeather = {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: MainWeatherDetails;
    visibility: 10000;
    wind: WindDetails;
    clouds: Cloud;
    dt: number;
    sys: WeatherSys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
    rain: Precipitation | null;
    snow: Precipitation | null;
};

export type DailyWeatherSys = {
    pod: string;
};

export type DailyWeatherTemperature = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
};

export type DailyWeatherDetails = {
    dt: number;
    main: DailyWeatherTemperature;
    weather: Weather[];
    clouds: Cloud;
    wind: WindDetails;
    visibility: number;
    pop: number;
    rain: Precipitation | null;
    sys: DailyWeatherSys;
    dt_txt: string;
};

export type WeatherForecast = {
    currentWeather: CurrentWeather | null;
    dailyForecast: DailyWeatherDetails[];
};

export type WeatherForecastResponse = {
    cod: string;
    message: number;
    cnt: number;
    list: DailyWeatherDetails[];
};
