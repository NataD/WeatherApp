import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';
import {Colors} from '@/constants/Colors';
import {Link, router} from 'expo-router';
import * as Location from 'expo-location';
import {useDispatch} from 'react-redux';
import {addAlert} from '@/store/reducers/alertSlice';
import Loader from '@/components/Loader';

function HomeScreen() {
    const homeScreenStyles = styles(),
        [isLoading, setIsLoading] = useState<boolean>(false),
        dispatch = useDispatch();

    const getAddress = async (latitude: number, longitude: number) => {
        const result = await Location.reverseGeocodeAsync({latitude, longitude});
        if (result) {
            setIsLoading(false);
            router.push({
                pathname: `/(home)/details`,
                params: {
                    city: result[0].city,
                    id: null,
                    lat: latitude,
                    lon: longitude,
                },
            });
        }
    };

    const detectLocation = async () => {
        setIsLoading(true);
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            dispatch(addAlert({message: 'Permission to access location was denied'}));
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = currentLocation.coords;
        getAddress(latitude, longitude);
    };

    return (
        <View style={homeScreenStyles.homeScreenContainer}>
            <View style={homeScreenStyles.card}>
                <Text style={homeScreenStyles.header}>Use your location to provide forecasts?</Text>
                <Image source={require('@/assets/images/weather-icon.png')} style={homeScreenStyles.image}></Image>
                <Text style={homeScreenStyles.description}>
                    Weather App would like to use your location to show forecasts for wherever you happen to be.
                </Text>

                <View>
                    <TouchableOpacity style={homeScreenStyles.locationBtn} onPress={() => detectLocation()}>
                        <Text style={homeScreenStyles.locationBtnText}>Detect location</Text>
                    </TouchableOpacity>
                    <Link href="/search" asChild>
                        <Pressable style={homeScreenStyles.redirectBtn}>
                            <Text style={homeScreenStyles.redirectBtnText}>Set up locations manually</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
            <Loader showLoader={isLoading} />
        </View>
    );
}

const styles = () =>
    StyleSheet.create({
        homeScreenContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        card: {
            borderRadius: 16,
            backgroundColor: Colors.cardBackground,
            paddingVertical: 40,
            paddingHorizontal: 30,
            marginHorizontal: 20,
        },
        header: {
            fontSize: 24,
            fontFamily: 'InterBold',
            lineHeight: 30,
            textAlign: 'center',
        },
        image: {
            marginVertical: 72,
            alignSelf: 'center',
        },
        description: {
            fontSize: 16,
            fontFamily: 'InterRegular',
            lineHeight: 20,
            marginBottom: 18,
            textAlign: 'center',
        },
        locationBtn: {
            backgroundColor: Colors.locationButtonBackgroundColor,
            marginBottom: 18,
            height: 44,
            width: '100%',
            justifyContent: 'center',
            borderRadius: 4,
            alignItems: 'center',
        },
        locationBtnText: {
            color: Colors.locationButtonTextColor,
            fontSize: 16,
            fontFamily: 'InterRegular',
            lineHeight: 20,
        },
        redirectBtn: {
            backgroundColor: Colors.cardBackground,
            borderWidth: 1,
            borderColor: Colors.redirectButtonTextColor,
            height: 44,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        redirectBtnText: {
            color: Colors.redirectButtonTextColor,
            fontSize: 16,
            fontFamily: 'InterRegular',
            lineHeight: 20,
        },
    });

export default HomeScreen;
