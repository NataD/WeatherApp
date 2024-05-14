import React from 'react';
import {Image, ImageBackground, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useLocalSearchParams} from 'expo-router';
import {useDispatch, useSelector} from 'react-redux';
import TemperatureDetails from '@/components/TemperatureDetails';
import {WeatherCondition} from '@/models/weather';
import {getWeatherForecast} from '@/store/reducers/weatherForecastSlice';
import {currentForecastWeatherSelector, dailyForecastWeatherSelector} from '@/store/selectors/weatherForecastSelectors';
import WeatherDetailsCard, {IWeatherCardType} from '@/components/WeatherDetailsCard';
import WeatherTable from '@/components/WeatherTable';
import {formatTime, roundTemperature} from '@/utils/displayUtils';
import {useWeatherBackground} from '@/hooks/useWeatherBackground';
import {Colors} from '@/constants/Colors';
import CustomHeader from '@/components/CustomHeader';

function ForecastScreen() {
    const forecastScreenStyles = styles(),
        params = useLocalSearchParams(),
        dispatch = useDispatch(),
        currentWeather = useSelector(currentForecastWeatherSelector),
        dailyForecast = useSelector(dailyForecastWeatherSelector);

    const backgroundImage = useWeatherBackground(currentWeather?.weather[0]?.main, true);

    useFocusEffect(
        React.useCallback(() => {
            if (params.lat && params.lon) {
                dispatch(getWeatherForecast(params.lat as string, params.lon as string));
            }
        }, [])
    );

    return (
        <SafeAreaView style={forecastScreenStyles.safeArea}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={forecastScreenStyles.imageBackground}>
                <View style={forecastScreenStyles.headerContainer}>
                    <CustomHeader title={String(params.city) || ''} />
                </View>
                <View style={forecastScreenStyles.detailsScreenContainer}>
                    <View style={forecastScreenStyles.detailsContainer}>
                        <View style={forecastScreenStyles.weatherDetails}>
                            <TemperatureDetails
                                weatherConditions={currentWeather?.weather[0].main || WeatherCondition.CLEAR}
                                icon={currentWeather?.weather[0]?.icon || null}
                                temperature={currentWeather?.main.temp || 0}
                                temperatureStyles={forecastScreenStyles.temperature}
                            />
                            <View style={forecastScreenStyles.additionalDetails}>
                                <View>
                                    <Text style={forecastScreenStyles.feelsTemperatureLabel}>Feels like</Text>
                                    <Text style={forecastScreenStyles.feelsTemperatureValue}>
                                        {roundTemperature(currentWeather?.main?.feels_like)}°
                                    </Text>
                                </View>
                                <View style={forecastScreenStyles.sunsetDetails}>
                                    <View style={[forecastScreenStyles.sunsetContainer, forecastScreenStyles.sunrise]}>
                                        <Image source={require('@/assets/images/sunrise-icon.png')} />
                                        <Text style={forecastScreenStyles.sunsetValue}>
                                            {formatTime(currentWeather?.sys?.sunrise || null, currentWeather?.timezone || 0)}
                                        </Text>
                                    </View>
                                    <View style={forecastScreenStyles.sunsetContainer}>
                                        <Image source={require('@/assets/images/sunset-icon.png')} />
                                        <Text style={forecastScreenStyles.sunsetValue}>
                                            {formatTime(currentWeather?.sys?.sunset || null, currentWeather?.timezone || 0)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {dailyForecast && dailyForecast.length ? (
                            <View style={forecastScreenStyles.listContainer}>
                                <WeatherTable data={dailyForecast} />
                            </View>
                        ) : null}

                        <View>
                            <View style={forecastScreenStyles.weatherCards}>
                                <WeatherDetailsCard type={IWeatherCardType.WIND} value={currentWeather?.wind?.speed || null} />
                                <WeatherDetailsCard
                                    type={IWeatherCardType.VISIBILITY}
                                    value={currentWeather?.visibility ? currentWeather.visibility / 1000 : null}
                                />
                            </View>
                            <View style={forecastScreenStyles.weatherCards}>
                                <WeatherDetailsCard type={IWeatherCardType.RAIN} value={currentWeather?.rain?.['1h'] || null} />
                                <WeatherDetailsCard type={IWeatherCardType.HUMIDITY} value={currentWeather?.main?.humidity || null} />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = () =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
        detailsScreenContainer: {
            flex: 1,
            paddingHorizontal: 30,
        },
        headerContainer: {
            paddingHorizontal: 20,
        },
        detailsContainer: {
            flex: 1,
        },
        weatherDetails: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
        additionalDetails: {
            marginLeft: 24,
            paddingBottom: 10,
        },
        feelsTemperatureLabel: {
            fontFamily: 'InterBold',
            color: Colors.cardBackground,
            fontSize: 13,
            lineHeight: 15,
        },
        feelsTemperatureValue: {
            fontFamily: 'InterBold',
            color: Colors.cardBackground,
            fontSize: 18,
            lineHeight: 22,
        },
        sunsetDetails: {
            flexDirection: 'row',
            marginTop: 6,
        },
        sunsetContainer: {
            flexDirection: 'row',
        },
        sunrise: {
            marginRight: 16,
        },
        sunsetValue: {
            fontFamily: 'InterRegular',
            color: Colors.cardBackground,
            fontSize: 16,
            lineHeight: 19,
            marginLeft: 2,
        },
        imageBackground: {
            flex: 1,
        },
        temperature: {
            fontFamily: 'InterRegular',
            fontSize: 72,
            lineHeight: 84,
            color: Colors.cardBackground,
        },
        listContainer: {
            marginBottom: 8,
            borderRadius: 8,
        },
        weatherCards: {
            flexDirection: 'row',
            gap: 8,
            marginBottom: 8,
        },
    });

export default ForecastScreen;
