import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors} from '@/constants/Colors';

export enum IWeatherCardType {
    WIND = 'wind',
    VISIBILITY = 'visibility',
    HUMIDITY = 'humidity',
    RAIN = 'rain',
}

const weatherConfig = {
    [IWeatherCardType.WIND]: {
        label: 'Wind',
        unit: 'm/s',
        icon: require('@/assets/images/wind-icon.png'),
    },
    [IWeatherCardType.VISIBILITY]: {
        label: 'Visibility',
        unit: 'km',
        icon: require('@/assets/images/visibility-icon.png'),
    },
    [IWeatherCardType.HUMIDITY]: {
        label: 'Humidity',
        unit: '%',
        icon: require('@/assets/images/humidity-icon.png'),
    },
    [IWeatherCardType.RAIN]: {
        label: 'Rain (last hour)',
        unit: 'mm',
        icon: require('@/assets/images/rain-icon.png'),
    },
};

interface IWeatherDetailsCardProps {
    type: IWeatherCardType;
    value: number | null;
}

const WeatherDetailsCard: React.FC<IWeatherDetailsCardProps> = ({type, value}) => {
    const weatherCardStyles = styles(),
        {label, unit, icon} = weatherConfig[type];

    return (
        <View style={weatherCardStyles.weatherCard}>
            <View>
                <Text style={weatherCardStyles.label}>{label}</Text>
                <Text style={weatherCardStyles.value}>
                    {value || '-'} {unit}
                </Text>
            </View>
            <Image source={icon} testID={'weather-icon'} />
        </View>
    );
};

const styles = () =>
    StyleSheet.create({
        weatherCard: {
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: Colors.weatherCardBackground,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        label: {
            fontFamily: 'InterBold',
            fontSize: 13,
            lineHeight: 15,
            color: Colors.cardBackground,
            marginBottom: 2,
        },
        value: {
            fontFamily: 'InterBold',
            fontSize: 18,
            lineHeight: 21,
            color: Colors.cardBackground,
        },
    });

export default WeatherDetailsCard;
