import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { CurrentWeather as CurrentWeatherData } from '../types';
import { getWeatherStatus, windDirectionLabel } from '../utils/weather';

interface Props {
  cityName: string;
  current: CurrentWeatherData;
  todayMax: number;
  todayMin: number;
}

function CurrentWeather({ cityName, current, todayMax, todayMin }: Props) {
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
      <Text style={styles.feelsLike}>
        Cảm giác như {Math.round(current.apparent_temperature)}°
      </Text>
      <View style={styles.statsRow}>
        <Text style={styles.stat}>
          Cao nhất {Math.round(todayMax)}° · Thấp nhất {Math.round(todayMin)}°
        </Text>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.stat}>
          Độ ẩm {current.relative_humidity_2m}%
        </Text>
        <Text style={styles.stat}>
          Gió {Math.round(current.wind_speed_10m)} km/h{' '}
          {'Hướng '}{windDirectionLabel(current.wind_direction_10m)}
        </Text>
      </View>
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
  feelsLike: {
    color: '#6b7f93',
    fontSize: 15,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  stat: {
    color: '#6b7f93',
    fontSize: 14,
    marginHorizontal: 6,
  },
});

export default CurrentWeather;
