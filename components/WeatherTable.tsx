import React, {useMemo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {DailyWeatherDetails} from '@/models/weather';
import {getDayName, roundTemperature} from '@/utils/displayUtils';
import {Colors} from '@/constants/Colors';

export interface IWeatherTableProps {
    data: DailyWeatherDetails[];
}

export interface IDailyData {
    [key: string]: {
        high: number;
        low: number;
        icon: string;
    };
}

const WeatherTable: React.FC<IWeatherTableProps> = ({data}) => {
    const tableStyles = styles();

    const dailyForecast = useMemo(() => {
        const dailyData: IDailyData = {},
            today = new Date().setHours(0, 0, 0, 0);

        data.forEach((forecast) => {
            const day = getDayName(forecast.dt),
                forecastDate = new Date(forecast.dt * 1000);

            if (forecastDate.setHours(0, 0, 0, 0) === today) {
                return;
            }

            if (!dailyData[day]) {
                dailyData[day] = {high: forecast.main.temp_max, low: forecast.main.temp_min, icon: forecast.weather[0].icon};
            } else {
                dailyData[day].high = Math.max(dailyData[day].high, forecast.main.temp_max);
                dailyData[day].low = Math.min(dailyData[day].low, forecast.main.temp_min);
            }
        });

        return dailyData;
    }, [data]);

    return (
        <View style={tableStyles.table}>
            <View style={tableStyles.row}>
                <Text style={[tableStyles.headerCell, tableStyles.temperatureHeaderCell]}></Text>
                <Text style={tableStyles.headerCell}></Text>
                <Text style={tableStyles.headerCell}>High</Text>
                <Text style={tableStyles.headerCell}>Low</Text>
            </View>

            {Object.entries(dailyForecast).map(([day, data]) => (
                <View key={day} style={tableStyles.row}>
                    <Text style={[tableStyles.cell, tableStyles.temperatureCell]}>{day}</Text>
                    <View style={tableStyles.cell}>
                        <Image
                            source={{uri: `http://openweathermap.org/img/wn/${data.icon}.png`}}
                            resizeMode={'contain'}
                            style={tableStyles.icon}
                            role={'img'}
                        />
                    </View>
                    <Text style={tableStyles.cell}>{roundTemperature(data.high)}</Text>
                    <Text style={[tableStyles.cell]}>{roundTemperature(data.low)}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = () =>
    StyleSheet.create({
        table: {
            marginTop: 20,
            backgroundColor: Colors.weatherCardBackground,
            paddingTop: 8,
            paddingLeft: 8,
            paddingBottom: 4,
            paddingRight: 16,
            borderRadius: 8,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 4,
        },
        headerCell: {
            flex: 1,
            fontFamily: 'InterBold',
            fontSize: 10,
            lineHeight: 12,
            color: Colors.cardBackground,
            textTransform: 'uppercase',
            textAlign: 'right',
        },
        temperatureHeaderCell: {
            flex: 2,
        },
        cell: {
            flex: 1,
            textAlign: 'right',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            color: Colors.cardBackground,
            fontFamily: 'InterRegular',
            fontSize: 16,
            lineHeight: 19,
        },
        temperatureCell: {
            textAlign: 'left',
            flex: 2,
        },
        icon: {
            width: 30,
            height: 30,
        },
    });

export default WeatherTable;
