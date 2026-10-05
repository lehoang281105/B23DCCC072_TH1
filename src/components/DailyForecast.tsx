import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {DailyData} from '../types';
import {formatDay, getWeatherStatus} from '../utils/weather';

interface Props {
  daily: DailyData;
  onPressDay: (index: number) => void;
}

function DailyForecast({daily, onPressDay}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dự báo theo ngày</Text>
      {daily.time.map((date, index) => {
        const status = getWeatherStatus(daily.weather_code[index]);
        const probability = daily.precipitation_probability_max[index];
        return (
          <Pressable
            key={date}
            style={({pressed}) => [styles.row, pressed && styles.rowPressed]}
            onPress={() => onPressDay(index)}>
            <Text style={styles.day}>
              {index === 0 ? 'Hôm nay' : formatDay(date)}
            </Text>
            <Text style={styles.emoji}>{status.emoji}</Text>
            <View style={styles.rightColumn}>
              <Text style={styles.temps}>
                <Text style={styles.tempMin}>
                  {Math.round(daily.temperature_2m_min[index])}°
                </Text>
                {'   '}
                <Text style={styles.tempMax}>
                  {Math.round(daily.temperature_2m_max[index])}°
                </Text>
              </Text>
              <Text style={styles.rain}>
                💧 {probability == null ? '—' : `${probability}%`}
              </Text>
            </View>
          </Pressable>
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
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  rowPressed: {
    backgroundColor: '#e8f1fa',
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
  rightColumn: {
    alignItems: 'flex-end',
    width: 96,
  },
  temps: {
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
  rain: {
    color: '#3f7fb5',
    fontSize: 12,
    marginTop: 2,
  },
});

export default DailyForecast;
