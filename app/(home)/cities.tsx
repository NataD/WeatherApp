import React from 'react';
import {View, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {favouriteCitiesSelector} from '@/store/selectors/sagaSelectors';
import LocationListItem from '@/components/LocationListItem';
import CustomHeader from '@/components/CustomHeader';

function CitiesScreen() {
    const citiesScreenStyles = styles(),
        cityList = useSelector(favouriteCitiesSelector);

    return (
        <SafeAreaView style={citiesScreenStyles.safeArea}>
            <View style={citiesScreenStyles.headerContainer}>
                <CustomHeader title={'Selected Locations'} />
            </View>
            <View style={citiesScreenStyles.searchScreenContainer}>
                {cityList && cityList.length ? (
                    <FlatList
                        data={cityList}
                        renderItem={({item}) => <LocationListItem city={item} />}
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
    });

export default CitiesScreen;
