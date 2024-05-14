import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {CityItem} from '@/models/city';
import {useRouter} from 'expo-router';
import CountryName from '@/components/CountryName';
import {Colors} from '@/constants/Colors';

interface ICityListItemProps {
    city: CityItem;
}

const CityListItem: React.FC<ICityListItemProps> = ({city}) => {
    const itemStyles = styles(),
        router = useRouter();

    const viewDetails = () => {
        router.push({pathname: `/(home)/details`, params: {city: city.name, id: city.id}});
    };

    return (
        <Pressable onPress={viewDetails} style={itemStyles.cityDetails}>
            <View>
                <Text style={itemStyles.title}>{city.name}</Text>
                <CountryName countryCode={city?.sys?.country} customStyles={itemStyles.details} />
            </View>
            <Image source={require('@/assets/images/arrow-right.png')} />
        </Pressable>
    );
};

const styles = () =>
    StyleSheet.create({
        cityDetails: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
            marginBottom: 24,
            paddingHorizontal: 8,
        },
        title: {
            fontFamily: 'InterRegular',
            color: Colors.cardBackground,
            lineHeight: 22,
            fontSize: 18,
        },
        details: {
            fontFamily: 'InterRegular',
            color: Colors.countryTextColor,
            lineHeight: 17,
            fontSize: 14,
        },
    });

export default CityListItem;
