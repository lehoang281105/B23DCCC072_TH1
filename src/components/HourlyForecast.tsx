import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import type {HourlyData} from '../types';
import {findCurrentHourIndex, formatHour, getWeatherStatus} from '../utils/weather';

interface Props {
  hourly: HourlyData;
  currentTime: string;
  onPressHour: (index: number) => void;
}

const MAX_HOURS = 24;

function HourlyForecast({hourly, currentTime, onPressHour}: Props) {
  const start = findCurrentHourIndex(hourly, currentTime);
  const count = Math.min(MAX_HOURS, hourly.time.length - start);
  const indices = Array.from({length: count}, (_, i) => start + i);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dự báo theo giờ</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={indices}
        keyExtractor={index => String(index)}
        renderItem={({item: hourIndex}) => {
          const status = getWeatherStatus(hourly.weather_code[hourIndex]);
          const probability = hourly.precipitation_probability[hourIndex];
          return (
            <Pressable
              style={({pressed}) => [styles.item, pressed && styles.itemPressed]}
              onPress={() => onPressHour(hourIndex)}>
              <Text style={styles.itemLabel}>
                {hourIndex === start
                  ? 'Bây giờ'
                  : formatHour(hourly.time[hourIndex])}
              </Text>
              <Text style={styles.itemEmoji}>{status.emoji}</Text>
              <Text style={styles.itemTemp}>
                {Math.round(hourly.temperature_2m[hourIndex])}°
              </Text>
              <Text style={styles.itemRain}>
                💧 {probability == null ? '—' : `${probability}%`}
              </Text>
            </Pressable>
          );
        }}
      />
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
    marginBottom: 12,
  },
  item: {
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 8,
    padding: 8,
  },
  itemPressed: {
    backgroundColor: '#e8f1fa',
  },
  itemLabel: {
    color: '#6b7f93',
    fontSize: 13,
  },
  itemEmoji: {
    fontSize: 22,
    marginVertical: 6,
  },
  itemTemp: {
    color: '#1c2b3a',
    fontSize: 15,
    fontWeight: '600',
  },
  itemRain: {
    color: '#3f7fb5',
    fontSize: 12,
    marginTop: 4,
  },
});

export default HourlyForecast;
