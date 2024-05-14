import {useMemo} from 'react';
import {WeatherCondition} from '@/models/weather';
import {getBackgroundImage} from '@/utils/weatherImages';

export const useWeatherBackground = (weatherType: WeatherCondition | undefined, isBlurred: boolean) => {
    const backgroundImage = useMemo(() => {
        return getBackgroundImage(weatherType, isBlurred);
    }, [weatherType, isBlurred]);

    return backgroundImage;
};
