export const roundTemperature = (temperature: number | undefined) => (temperature ? Math.round(temperature) : '-');

export const getDayName = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString('en-US', {weekday: 'long'});
};

export const formatTime = (unixTimestamp: number | null, timezoneOffset: number) => {
    if (unixTimestamp === null) {
        return '-';
    }
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
