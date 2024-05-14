import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeTemperatureUnit, TemperatureUnit} from '@/store/reducers/sagaSlice';
import {temperatureUnitSelector} from '@/store/selectors/sagaSelectors';
import {Colors} from '@/constants/Colors';
import CustomHeader from '@/components/CustomHeader';

function SettingsScreen() {
    const settingsScreenStyles = styles(),
        dispatch = useDispatch(),
        temperatureUnit = useSelector(temperatureUnitSelector),
        [isCelsius, setIsCelsius] = useState(temperatureUnit === TemperatureUnit.METRIC),
        animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(animation, {
            toValue: isCelsius ? 0 : 1,
            useNativeDriver: false,
            bounciness: 10,
        }).start();
    }, []);

    const toggleTemperatureUnit = () => {
        const toValue = isCelsius ? 1 : 0;

        Animated.spring(animation, {
            toValue,
            useNativeDriver: false,
            bounciness: 10,
        }).start();

        const temperatureUnit = !isCelsius ? TemperatureUnit.METRIC : TemperatureUnit.IMPERIAL;
        dispatch(changeTemperatureUnit(temperatureUnit));
        setIsCelsius(!isCelsius);
    };

    const slideInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 60],
    });

    const animatedStyle = {
        transform: [{translateX: slideInterpolate}],
    };

    const colorCelsius = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.textDark, Colors.textLight],
    });

    const colorFahrenheit = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.textLight, Colors.textDark],
    });

    return (
        <SafeAreaView style={settingsScreenStyles.safeArea}>
            <View style={settingsScreenStyles.headerContainer}>
                <CustomHeader title={'Settings'} />
            </View>
            <View style={settingsScreenStyles.settingsScreenContainer}>
                <View>
                    <Text style={settingsScreenStyles.label}>Temperature Units</Text>
                    <View style={settingsScreenStyles.buttonContainer}>
                        <Animated.View style={[settingsScreenStyles.background, animatedStyle]} />
                        <TouchableOpacity style={settingsScreenStyles.button} onPress={toggleTemperatureUnit}>
                            <Animated.Text style={[settingsScreenStyles.buttonText, {color: colorCelsius}]}>°C</Animated.Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={settingsScreenStyles.button} onPress={toggleTemperatureUnit}>
                            <Animated.Text style={[settingsScreenStyles.buttonText, {color: colorFahrenheit}]}>°F</Animated.Text>
                        </TouchableOpacity>
                    </View>
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
        },
        headerContainer: {
            paddingHorizontal: 20,
        },
        settingsScreenContainer: {
            paddingHorizontal: 30,
        },
        label: {
            fontSize: 16,
            fontFamily: 'InterRegular',
            lineHeight: 20,
            color: Colors.cardBackground,
            marginBottom: 16,
        },
        buttonContainer: {
            flexDirection: 'row',
            height: 34,
            width: 120,
            borderColor: Colors.inputBorderColor,
            borderRadius: 4,
            backgroundColor: Colors.inputBackgroundColor,
            overflow: 'hidden',
            borderWidth: 1,
        },
        background: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '50%',
            backgroundColor: Colors.locationButtonTextColor,
            borderRadius: 4,
        },
        button: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            fontFamily: 'InterRegular',
            fontSize: 16,
        },
    });

export default SettingsScreen;
