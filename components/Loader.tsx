import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Colors} from '@/constants/Colors';

interface ILoaderProps {
    showLoader: boolean;
    overlayColor?: string;
}

const Loader: React.FC<ILoaderProps> = ({showLoader, overlayColor}) => {
    const loaderStyles = styles(overlayColor);

    if (!showLoader) {
        return null;
    }

    return (
        <View style={loaderStyles.loaderContainer} testID={'loader'}>
            <ActivityIndicator size="large" color={Colors.text} animating={showLoader} />
        </View>
    );
};

const styles = (overlayColor?: string) =>
    StyleSheet.create({
        loaderContainer: {
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: overlayColor || Colors.loaderBackgroundColor,
        },
    });

export default Loader;
