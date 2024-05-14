import React, {useEffect, useState} from 'react';
import {Colors} from '@/constants/Colors';
import {router, Stack, useNavigationContainerRef, usePathname} from 'expo-router';
import {useDispatch, useSelector} from 'react-redux';
import {defaultFavouriteCitySelector} from '@/store/selectors/sagaSelectors';
import Loader from '@/components/Loader';
import {isLoadingSelector} from '@/store/selectors/loadingSelectors';
import Toast from '@/components/Toast';
import {alertsSelector} from '@/store/selectors/alertSelectors';
import {removeAlert} from '@/store/reducers/alertSlice';

export default function HomeLayout() {
    const favouriteCity = useSelector(defaultFavouriteCitySelector),
        rootNavigation = useNavigationContainerRef(),
        pathName = usePathname(),
        [isNavigationReady, setNavigationReady] = useState(false),
        isLoading = useSelector(isLoadingSelector),
        alerts = useSelector(alertsSelector),
        dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = rootNavigation?.addListener('state', () => {
            setNavigationReady(true);
        });
        return function cleanup() {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [rootNavigation]);

    useEffect(() => {
        if (favouriteCity && isNavigationReady && pathName !== '/details') {
            router.push({
                pathname: `/(home)/details`,
                params: {
                    city: favouriteCity.name,
                    id: favouriteCity.id,
                },
            });
        }
    }, [favouriteCity, isNavigationReady]);

    const onRemoveAlert = (alertId: string) => {
        dispatch(removeAlert(alertId));
    };

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {backgroundColor: Colors.background},
                }}>
                <Stack.Screen name="index" options={{title: 'Home'}} />
                <Stack.Screen name="search" options={{title: 'Search'}} />
                <Stack.Screen name="details" options={{title: 'Details'}} />
                <Stack.Screen name="forecast" options={{title: 'Forecast'}} />
                <Stack.Screen name="settings" options={{title: 'Settings'}} />
                <Stack.Screen name="cities" options={{title: 'Cities'}} />
            </Stack>

            <Loader showLoader={isLoading} />
            <Toast alerts={alerts} removeAlert={onRemoveAlert} />
        </>
    );
}
