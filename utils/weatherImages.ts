import {WeatherCondition} from '@/models/weather';

const images = {
    clear: require('@/assets/images/sunny-background.png'),
    clearBlurred: require('@/assets/images/sunny-background-blurred.png'),
    cloud: require('@/assets/images/cloud-background.png'),
    cloudBlurred: require('@/assets/images/cloud-background-blurred.png'),
    mist: require('@/assets/images/fog-background.png'),
    mistBlurred: require('@/assets/images/fog-background-blurred.png'),
    thunderstorm: require('@/assets/images/thunderstorm-background.png'),
    thunderstormBlurred: require('@/assets/images/thunderstorm-background-blurred.png'),
    rain: require('@/assets/images/rain-background.png'),
    rainBlurred: require('@/assets/images/rain-background-blurred.png'),
    squall: require('@/assets/images/squall-background.png'),
    squallBlurred: require('@/assets/images/squall-background-blurred.png'),
    snow: require('@/assets/images/snow-background.png'),
    snowBlurred: require('@/assets/images/snow-background-blurred.png'),
};

export const getBackgroundImage = (weatherType: WeatherCondition | undefined, isBlurred: boolean) => {
    switch (weatherType) {
        case WeatherCondition.CLEAR:
            return isBlurred ? images.clearBlurred : images.clear;
        case WeatherCondition.CLOUDS:
            return isBlurred ? images.cloudBlurred : images.cloud;
        case WeatherCondition.MIST:
        case WeatherCondition.HAZE:
        case WeatherCondition.FOG:
            return isBlurred ? images.mistBlurred : images.mist;
        case WeatherCondition.THUNDERSTORM:
            return isBlurred ? images.thunderstormBlurred : images.thunderstorm;
        case WeatherCondition.RAIN:
        case WeatherCondition.DRIZZLE:
            return isBlurred ? images.rainBlurred : images.rain;
        case WeatherCondition.SMOKE:
        case WeatherCondition.DUST:
        case WeatherCondition.SAND:
        case WeatherCondition.ASH:
        case WeatherCondition.SQUALL:
        case WeatherCondition.TORNADO:
            return isBlurred ? images.squallBlurred : images.squall;
        case WeatherCondition.SNOW:
            return isBlurred ? images.snowBlurred : images.snow;
        default:
            return images.clear;
    }
};
