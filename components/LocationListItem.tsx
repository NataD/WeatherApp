import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useRouter} from 'expo-router';
import {IFavouriteCity, removeCity} from '@/store/reducers/sagaSlice';
import {Colors} from '@/constants/Colors';

interface ILocationListItem {
    city: IFavouriteCity;
}
const LocationListItem: React.FC<ILocationListItem> = ({city}) => {
    const itemStyles = styles(),
        router = useRouter(),
        dispatch = useDispatch();

    const removeLocation = () => {
        dispatch(removeCity(String(city.id)));
    };
    const viewDetails = () => {
        router.push({pathname: `/(home)/details`, params: {city: city.name, id: city.id}});
    };

    return (
        <View style={itemStyles.wrapper}>
            <Pressable onPress={removeLocation} style={itemStyles.removeBtn} testID={'remove-btn'}>
                <Image source={require('@/assets/images/remove-icon.png')} />
            </Pressable>

            <Pressable onPress={viewDetails} style={itemStyles.cityDetails}>
                <View>
                    <Text style={itemStyles.title}>{city.name}</Text>
                </View>
                <Image source={require('@/assets/images/arrow-right.png')} />
            </Pressable>
        </View>
    );
};
const styles = () =>
    StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        cityDetails: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
        },
        title: {
            fontFamily: 'InterRegular',
            color: Colors.cardBackground,
            lineHeight: 21,
            fontSize: 18,
        },
        removeBtn: {
            paddingHorizontal: 16,
            paddingVertical: 10,
        },
    });

export default LocationListItem;
