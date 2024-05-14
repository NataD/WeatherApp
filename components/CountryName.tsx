import React from 'react';
import {Text, TextStyle} from 'react-native';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

interface ICountryNameProps {
    countryCode: string | null;
    customStyles?: TextStyle;
}

const CountryName: React.FC<ICountryNameProps> = ({countryCode, customStyles}) => {
    const countryName = countryCode ? countries.getName(countryCode, 'en') : '';

    return <Text style={customStyles ? customStyles : {}}>{countryName}</Text>;
};

export default CountryName;
