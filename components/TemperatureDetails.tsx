import React from 'react';
import {View, Text, StyleSheet, Image, ImageStyle, TextStyle} from 'react-native';
import {roundTemperature} from '@/utils/displayUtils';
import {WeatherCondition} from '@/models/weather';
import {Colors} from '@/constants/Colors';

interface ITemperatureDetailsProps {
    weatherConditions: WeatherCondition;
    temperature: number;
    icon: string | null;
    iconStyles?: ImageStyle;
    temperatureStyles?: TextStyle;
}

const TemperatureDetails: React.FC<ITemperatureDetailsProps> = ({weatherConditions, temperature, icon, iconStyles, temperatureStyles}) => {
    const detailsScreenStyles = styles();
    const iconUri = icon ? `http://openweathermap.org/img/wn/${icon}.png` : undefined;

    return (
        <View>
            <View style={detailsScreenStyles.conditions}>
                {icon ? <Image style={[detailsScreenStyles.conditionsIcon, iconStyles ? iconStyles : {}]} source={{uri: iconUri}} /> : null}
                <Text style={detailsScreenStyles.weatherConditions}>{weatherConditions}</Text>
            </View>

            <Text style={[detailsScreenStyles.temperature, temperatureStyles ? temperatureStyles : {}]}>
                {roundTemperature(temperature)}°
            </Text>
        </View>
    );
};
const styles = () =>
    StyleSheet.create({
        conditions: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        conditionsIcon: {
            height: 24,
            width: 24,
            marginRight: 3,
        },
        weatherConditions: {
            fontFamily: 'InterBold',
            fontSize: 16,
            lineHeight: 19,
            color: Colors.cardBackground,
        },
        temperature: {
            fontFamily: 'InterBold',
            fontSize: 96,
            lineHeight: 116,
            color: Colors.cardBackground,
        },
    });

export default TemperatureDetails;
