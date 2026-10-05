import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MetricTile from '../components/MetricTile';
import type {RootStackParamList} from '../types';
import {
  formatDay,
  formatHour,
  formatVisibility,
  getUvLevel,
  getWeatherStatus,
  windDirectionLabel,
} from '../utils/weather';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

function DetailScreen({route}: Props) {
  const {forecast, cityName, kind, index} = route.params;
  const {current, hourly, daily} = forecast;

  // Màn hình chi tiết: nếu chọn một giờ -> lấy dữ liệu giờ đó (kèm ghi chú
  // cảm giác như/độ ẩm từ dữ liệu hourly); nếu chọn một ngày -> dữ liệu ngày đó.
  const isHourly = kind === 'hourly';

  const header = isHourly
    ? {
        title: `${formatHour(hourly.time[index])}, ${formatDay(
          hourly.time[index].slice(0, 10),
        )}`,
        emoji: getWeatherStatus(hourly.weather_code[index]).emoji,
        label: getWeatherStatus(hourly.weather_code[index]).label,
        temperature: hourly.temperature_2m[index],
      }
    : {
        title: index === 0 ? 'Hôm nay' : formatDay(daily.time[index]),
        emoji: getWeatherStatus(daily.weather_code[index]).emoji,
        label: getWeatherStatus(daily.weather_code[index]).label,
        temperature: null,
      };

  const uv = isHourly ? hourly.uv_index[index] : daily.uv_index_max[index];
  const uvLevel = getUvLevel(uv);
  const windSpeed = isHourly
    ? hourly.wind_speed_10m[index]
    : daily.wind_speed_10m_max[index];
  const windDirection = isHourly
    ? hourly.wind_direction_10m[index]
    : current.wind_direction_10m;
  const probability = isHourly
    ? hourly.precipitation_probability[index]
    : daily.precipitation_probability_max[index];
  const precipitation = isHourly
    ? hourly.precipitation[index]
    : daily.precipitation_sum[index];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>{cityName}</Text>
        <Text style={styles.headerTime}>{header.title}</Text>
        <Text style={styles.headerEmoji}>{header.emoji}</Text>
        <Text style={styles.headerLabel}>{header.label}</Text>
        {header.temperature != null && (
          <Text style={styles.headerTemp}>
            {Math.round(header.temperature)}°C
          </Text>
        )}
      </View>

      <View style={styles.tiles}>
        {isHourly ? (
          <>
            <MetricTile
              icon="🌡️"
              label="Nhiệt độ"
              value={`${Math.round(hourly.temperature_2m[index])}°C`}
            />
            <MetricTile
              icon="🥵"
              label="Cảm giác như"
              value={`${Math.round(hourly.apparent_temperature[index])}°C`}
            />
            <MetricTile
              icon="💧"
              label="Độ ẩm"
              value={`${hourly.relative_humidity_2m[index]}%`}
            />
            <MetricTile
              icon="☀️"
              label="Chỉ số UV"
              value={uv.toFixed(1)}
              sub={uvLevel.label}
              valueColor={uvLevel.color}
            />
          </>
        ) : (
          <>
            <MetricTile
              icon="⬆️"
              label="Nhiệt độ cao nhất"
              value={`${Math.round(daily.temperature_2m_max[index])}°C`}
            />
            <MetricTile
              icon="⬇️"
              label="Nhiệt độ thấp nhất"
              value={`${Math.round(daily.temperature_2m_min[index])}°C`}
            />
            <MetricTile
              icon="☀️"
              label="UV tối đa"
              value={uv.toFixed(1)}
              sub={uvLevel.label}
              valueColor={uvLevel.color}
            />
          </>
        )}

        <MetricTile
          icon="💨"
          label={isHourly ? 'Tốc độ gió' : 'Gió mạnh nhất'}
          value={`${Math.round(windSpeed)} km/h`}
          sub={`Hướng gió: ${windDirectionLabel(windDirection)} (${Math.round(
            windDirection,
          )}°)`}
        />
        <MetricTile
          icon="🌧️"
          label="Khả năng mưa"
          value={probability == null ? '—' : `${probability}%`}
        />
        <MetricTile
          icon="☔"
          label="Lượng mưa"
          value={`${precipitation.toFixed(1)} mm`}
        />
        {isHourly && (
          <MetricTile
            icon="👁️"
            label="Tầm nhìn"
            value={formatVisibility(hourly.visibility[index])}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#dcebf8',
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  headerCard: {
    alignItems: 'center',
    backgroundColor: '#1e6fb8',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 24,
  },
  headerTitle: {
    color: '#dcebf8',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTime: {
    color: '#bcd7ee',
    fontSize: 14,
    marginTop: 2,
  },
  headerEmoji: {
    fontSize: 56,
    marginTop: 12,
  },
  headerLabel: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 4,
  },
  headerTemp: {
    color: '#ffffff',
    fontSize: 56,
    fontWeight: '700',
    marginTop: 4,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default DetailScreen;
