import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {CurrentWeather as CurrentWeatherData} from '../types';
import {getWeatherStatus} from '../utils/weather';

interface Props {
  cityName: string;
  current: CurrentWeatherData;
}

function CurrentWeather({cityName, current}: Props) {
  const status = getWeatherStatus(current.weather_code);
  return (
    <View style={styles.card}>
      <Text style={styles.cityName}>{cityName}</Text>
      <Text style={styles.temperature}>
        {Math.round(current.temperature_2m)}°
      </Text>
      <Text style={styles.status}>
        {status.emoji} {status.label}
      </Text>
      <Text style={styles.extra}>Độ ẩm: {current.relative_humidity_2m}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 24,
  },
  cityName: {
    color: '#33475b',
    fontSize: 22,
    fontWeight: '600',
  },
  temperature: {
    color: '#1c2b3a',
    fontSize: 72,
    fontWeight: '700',
    marginVertical: 8,
  },
  status: {
    color: '#33475b',
    fontSize: 18,
  },
  extra: {
    color: '#6b7f93',
    fontSize: 14,
    marginTop: 8,
  },
});

export default CurrentWeather;
