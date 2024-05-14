import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {Colors} from '@/constants/Colors';

interface ICustomHeaderProps {
    title: string;
}

const CustomHeader: React.FC<ICustomHeaderProps> = ({title}) => {
    const headerStyles = styles(),
        router = useRouter();

    return (
        <View style={headerStyles.headerContainer}>
            <Pressable
                testID={'back-button'}
                onPress={() => {
                    router.back();
                }}
                style={headerStyles.backBtn}>
                <Image source={require('@/assets/images/arrow-back.png')} />
            </Pressable>
            <Text style={headerStyles.header}>{title}</Text>
            <View style={headerStyles.placeholder} />
        </View>
    );
};
const styles = () =>
    StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            marginBottom: 20,
            alignItems: 'center',
        },
        header: {
            fontSize: 16,
            fontFamily: 'InterBold',
            lineHeight: 20,
            textAlign: 'center',
            color: Colors.cardBackground,
            flex: 1,
        },
        backBtn: {
            padding: 10,
        },
        placeholder: {
            width: 30,
        },
    });

export default CustomHeader;
