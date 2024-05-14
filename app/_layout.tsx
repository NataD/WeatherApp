import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';
import {PersistGate} from 'redux-persist/integration/react';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Provider} from 'react-redux';
import store, {persistor} from '@/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack>
                        <Stack.Screen name="(home)" options={{headerShown: false}} />
                    </Stack>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
