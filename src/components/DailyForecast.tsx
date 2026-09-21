import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {DailyData} from '../types';
import {formatDay, getWeatherStatus} from '../utils/weather';

interface Props {
  daily: DailyData;
}

function DailyForecast({daily}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dự báo theo ngày</Text>
      {daily.time.map((date, index) => {
        const status = getWeatherStatus(daily.weather_code[index]);
        return (
          <View key={date} style={styles.row}>
            <Text style={styles.day}>
              {index === 0 ? 'Hôm nay' : formatDay(date)}
            </Text>
            <Text style={styles.emoji}>{status.emoji}</Text>
            <Text style={styles.temps}>
              <Text style={styles.tempMin}>
                {Math.round(daily.temperature_2m_min[index])}°
              </Text>
              {'   '}
              <Text style={styles.tempMax}>
                {Math.round(daily.temperature_2m_max[index])}°
              </Text>
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  title: {
    color: '#33475b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  day: {
    color: '#1c2b3a',
    flex: 1,
    fontSize: 15,
  },
  emoji: {
    fontSize: 20,
    marginRight: 12,
  },
  temps: {
    width: 72,
    textAlign: 'right',
  },
  tempMin: {
    color: '#6b7f93',
    fontSize: 15,
  },
  tempMax: {
    color: '#1c2b3a',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default DailyForecast;
