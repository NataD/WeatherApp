import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCityList, resetToInitialCityList} from '@/store/reducers/cityListSlice';
import {cityListSelector} from '@/store/selectors/cityListSelectors';
import CityListItem from '@/components/CityListItem';
import {useFocusEffect} from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import {Colors} from '@/constants/Colors';

function SearchScreen() {
    const searchScreenStyles = styles(),
        [location, setLocation] = useState<string>(''),
        cityList = useSelector(cityListSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        const handler = setTimeout(() => {
            if (location.length > 3) {
                dispatch(getCityList(location));
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [location, dispatch]);

    const inputRef = useRef<TextInput | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }

            return () => {
                setLocation('');
                dispatch(resetToInitialCityList());
            };
        }, [])
    );

    return (
        <SafeAreaView style={searchScreenStyles.safeArea}>
            <View style={searchScreenStyles.headerContainer}>
                <CustomHeader title={'Search location'} />
            </View>
            <View style={searchScreenStyles.searchScreenContainer}>
                <TextInput
                    ref={inputRef}
                    style={[searchScreenStyles.input, location.length > 0 && searchScreenStyles.inputFocused]}
                    onChangeText={setLocation}
                    value={location}
                    placeholder="Search for a city or airport"
                    placeholderTextColor={Colors.inputPlaceholderColor}
                    autoComplete={'off'}
                    autoCorrect={false}
                    clearButtonMode={'while-editing'}
                />
                {location.length > 0 ? (
                    <Text style={searchScreenStyles.description}>
                        Info for Devs: Please type the precise location. Free API doesn’t allow for autocomplete.
                    </Text>
                ) : null}

                {cityList && cityList.length ? (
                    <FlatList
                        keyboardShouldPersistTaps={'always'}
                        data={cityList}
                        renderItem={({item}) => <CityListItem city={item} />}
                        keyExtractor={(item) => String(item.id)}
                    />
                ) : null}
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
        searchScreenContainer: {
            paddingHorizontal: 30,
        },
        headerContainer: {
            paddingHorizontal: 20,
        },
        input: {
            height: 50,
            marginBottom: 24,
            borderWidth: 1,
            padding: 10,
            width: '100%',
            borderColor: Colors.inputBorderColor,
            borderRadius: 4,
            backgroundColor: Colors.inputBackgroundColor,
            color: Colors.locationButtonTextColor,
            fontSize: 16,
            fontFamily: 'InterRegular',
            lineHeight: 20,
        },
        description: {
            fontFamily: 'InterRegular',
            fontSize: 14,
            lineHeight: 17,
            color: Colors.descriptionTextColor,
            marginBottom: 24,
            paddingHorizontal: 8,
        },
        inputFocused: {
            borderColor: Colors.locationButtonTextColor,
        },
    });

export default SearchScreen;
