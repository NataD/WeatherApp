import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AlertObject, AlertType} from '@/store/reducers/alertSlice';
import {Colors} from '@/constants/Colors';

interface IToastProps {
    alerts: AlertObject[] | [];
    removeAlert: (alertId: string) => void;
}

const Toast: React.FC<IToastProps> = ({alerts, removeAlert}) => {
    const toastStyles = styles(),
        [activeAlerts, setActiveAlerts] = React.useState<AlertObject[]>([]);

    useEffect(() => {
        if (alerts.length === 0) {
            return setActiveAlerts([]);
        }
        const timeoutIds: NodeJS.Timeout[] = [];

        const alertsToSet = alerts.map((alert: AlertObject) => {
            if ((alert.type === AlertType.SUCCESS || alert.type === AlertType.ERROR) && alert.displayFor !== 0) {
                const timeoutId = setTimeout(() => {
                    if (alert && alert.id) {
                        removeAlert(String(alert.id));
                    }
                }, alert.displayFor);
                timeoutIds.push(timeoutId);
            }

            return alert;
        });
        setActiveAlerts(alertsToSet);

        return () => {
            timeoutIds.forEach(clearTimeout);
        };
    }, [alerts, removeAlert]);

    if (activeAlerts.length === 0) {
        return null;
    }

    return (
        <View style={toastStyles.wrapper}>
            {activeAlerts.map((alert) => (
                <View key={alert.id} style={toastStyles.alertWrapper}>
                    <Text style={toastStyles.text}>{alert.message}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = () =>
    StyleSheet.create({
        wrapper: {
            width: '100%',
            position: 'absolute',
            bottom: 20,
            left: 0,
        },
        alertWrapper: {
            flex: 1,
            backgroundColor: Colors.alertBackgroundColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            zIndex: 9999,
            opacity: 1,
            marginHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.cardBackground,
        },
        text: {
            color: Colors.cardBackground,
            fontSize: 16,
            fontFamily: 'InterRegular',
            lineHeight: 19,
        },
    });

export default Toast;
