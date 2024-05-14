import React from 'react';
import {Image, ImageBackground, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentWeatherDetails, getLocationWeatherDetails} from '@/store/reducers/currentWeatherSlice';
import {currentWeatherSelector} from '@/store/selectors/currentWeatherSelectors';
import TemperatureDetails from '@/components/TemperatureDetails';
import {WeatherCondition} from '@/models/weather';
import {LinearGradient} from 'expo-linear-gradient';
import {isCityFavouriteSelector} from '@/store/selectors/sagaSelectors';
import {addCity, removeCity} from '@/store/reducers/sagaSlice';
import {useWeatherBackground} from '@/hooks/useWeatherBackground';
import {addAlert, AlertType} from '@/store/reducers/alertSlice';
import {Colors} from '@/constants/Colors';

function DetailsScreen() {
    const detailsScreenStyles = styles(),
        params = useLocalSearchParams(),
        router = useRouter(),
        dispatch = useDispatch(),
        currentWeatherDetails = useSelector(currentWeatherSelector),
        cityId = params.id ? String(params.id) : currentWeatherDetails ? String(currentWeatherDetails?.id) : null,
        isCityFavourite = useSelector((state) => isCityFavouriteSelector(state, cityId));

    const backgroundImage = useWeatherBackground(currentWeatherDetails?.weather[0]?.main, false);

    const addToFavourite = () => {
        if (params.city && cityId) {
            if (isCityFavourite) {
                dispatch(removeCity(cityId));
            } else {
                dispatch(
                    addCity({
                        name: String(params.city),
                        id: cityId,
                    })
                );
                dispatch(addAlert({message: 'Location has been saved.', type: AlertType.SUCCESS}));
            }
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (params.id) {
                dispatch(getCurrentWeatherDetails(String(params.id)));
            } else if (params.lat && params.lon) {
                dispatch(getLocationWeatherDetails(String(params.lat), String(params.lon)));
            }
        }, [])
    );

    const redirectToForecast = () => {
        router.push({
            pathname: '/forecast',
            params: {
                city: params.city,
                lat: currentWeatherDetails?.coord.lat,
                lon: currentWeatherDetails?.coord.lon,
            },
        });
    };

    return (
        <SafeAreaView style={detailsScreenStyles.safeArea}>
            <View style={detailsScreenStyles.detailsScreenContainer}>
                <View style={detailsScreenStyles.headerContainer}>
                    <Pressable onPress={() => router.navigate({pathname: `/search`})} style={detailsScreenStyles.headerBtn}>
                        <Image source={require('@/assets/images/arrow-back.png')} />
                    </Pressable>
                    <Pressable onPress={() => router.navigate({pathname: `/cities`})} style={detailsScreenStyles.cityName}>
                        <Text style={detailsScreenStyles.header}>{params.city}</Text>
                        <Image source={require('@/assets/images/arrow-down.png')} style={detailsScreenStyles.iconMore}></Image>
                    </Pressable>
                    <Pressable onPress={() => router.navigate({pathname: `/settings`})} style={detailsScreenStyles.headerBtn}>
                        <Image source={require('@/assets/images/settings-icon.png')} />
                    </Pressable>
                </View>
                <View style={detailsScreenStyles.detailsContainer}>
                    <ImageBackground source={backgroundImage} resizeMode="cover" style={detailsScreenStyles.imageBackground}>
                        <View style={detailsScreenStyles.favouriteBtnContainer}>
                            <LinearGradient
                                colors={['rgba(0,0,0,1)', 'transparent']}
                                start={{x: 0, y: 0}}
                                end={{x: 0, y: 1}}
                                style={[detailsScreenStyles.background, detailsScreenStyles.headerBackground]}
                            />

                            {isCityFavourite ? null : (
                                <Pressable onPress={addToFavourite} style={detailsScreenStyles.saveBtn}>
                                    <Image
                                        style={detailsScreenStyles.saveBtnImage}
                                        source={require('@/assets/images/star-dark-icon.png')}
                                    />
                                    <Text style={detailsScreenStyles.saveBtnText}>Save location</Text>
                                </Pressable>
                            )}
                        </View>

                        <Pressable onPress={redirectToForecast}>
                            <View style={detailsScreenStyles.weatherDetails}>
                                <LinearGradient
                                    colors={['rgba(0,0,0,1)', 'transparent']}
                                    start={{x: 0, y: 1}}
                                    end={{x: 0, y: 0}}
                                    style={detailsScreenStyles.background}
                                />
                                <View style={detailsScreenStyles.details}>
                                    <TemperatureDetails
                                        weatherConditions={currentWeatherDetails?.weather[0].main || WeatherCondition.CLEAR}
                                        icon={currentWeatherDetails?.weather[0]?.icon || null}
                                        temperature={currentWeatherDetails?.main.temp || 0}
                                    />
                                    <Text style={detailsScreenStyles.detailsText}>Tap here for more details</Text>
                                </View>
                            </View>
                        </Pressable>
                    </ImageBackground>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = () =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            paddingBottom: Platform.OS === 'android' ? 10 : 0,
        },
        detailsScreenContainer: {
            flex: 1,
            paddingHorizontal: Platform.OS === 'android' ? 16 : 30,
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        headerBtn: {
            padding: 10,
        },
        header: {
            fontSize: 16,
            fontFamily: 'InterBold',
            lineHeight: 20,
            textAlign: 'center',
            color: Colors.cardBackground,
        },
        detailsContainer: {
            borderRadius: 40,
            flex: 1,
            overflow: 'hidden',
            justifyContent: 'space-between',
        },
        weatherDetails: {
            paddingHorizontal: 16,
            marginBottom: 26,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        details: {
            flex: 1,
        },
        background: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 200,
        },
        headerBackground: {
            height: 60,
        },
        imageBackground: {
            flex: 1,
            justifyContent: 'space-between',
        },
        saveBtn: {
            backgroundColor: Colors.lightButtonBackgroundColor,
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 2,
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 6.5,
            marginTop: 26,
            marginRight: 20,
        },
        saveBtnText: {
            color: Colors.lightButtonTextColor,
            fontFamily: 'InterRegular',
            fontSize: 12,
            lineHeight: 14,
        },
        saveBtnImage: {
            width: 16,
            height: 16,
            marginRight: 8,
        },
        detailsText: {
            color: Colors.cardBackground,
            textAlign: 'center',
            fontFamily: 'InterRegular',
            fontSize: 16,
            lineHeight: 19,
            marginTop: 13,
        },
        favouriteBtnContainer: {
            padding: 10,
            alignItems: 'flex-end',
        },
        cityName: {
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
        },
        iconMore: {
            marginLeft: 16,
        },
    });

export default DetailsScreen;
