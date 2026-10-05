import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fetchWeather} from '../api/weather';
import CityPicker from '../components/CityPicker';
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';
import {CITIES} from '../constants';
import type {ForecastResponse, RootStackParamList} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props) {
  const [forecasts, setForecasts] = useState<ForecastResponse[]>([]);
  const [selectedCityId, setSelectedCityId] = useState(CITIES[0].id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation fade-in khi load xong hoặc khi đổi thành phố
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Một request duy nhất lấy cả 5 thành phố; đổi thành phố chỉ lọc local
      const data = await fetchWeather();
      setForecasts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (loading || error !== null) {
      return;
    }
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [loading, error, selectedCityId, fadeAnim]);

  const selectedIndex = CITIES.findIndex(city => city.id === selectedCityId);
  const selected = selectedIndex >= 0 ? forecasts[selectedIndex] : undefined;

  const openHourDetail = (hourIndex: number) => {
    if (selected == null) {
      return;
    }
    navigation.navigate('Detail', {
      forecast: selected,
      cityName: CITIES[selectedIndex].name,
      kind: 'hourly',
      index: hourIndex,
    });
  };

  const openDayDetail = (dayIndex: number) => {
    if (selected == null) {
      return;
    }
    navigation.navigate('Detail', {
      forecast: selected,
      cityName: CITIES[selectedIndex].name,
      kind: 'daily',
      index: dayIndex,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1e6fb8" />
          <Text style={styles.hint}>Đang tải dữ liệu thời tiết...</Text>
        </View>
      ) : error !== null ? (
        <View style={styles.center}>
          <Text style={styles.errorEmoji}>🌩️</Text>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={load}>
            <Text style={styles.retryText}>Thử lại</Text>
          </Pressable>
        </View>
      ) : selected ? (
        <Animated.View style={[styles.flex, {opacity: fadeAnim}]}>
          <ScrollView contentContainerStyle={styles.content}>
            <CityPicker
              cities={CITIES}
              selectedId={selectedCityId}
              onSelect={setSelectedCityId}
            />
            <CurrentWeather
              cityName={CITIES[selectedIndex].name}
              current={selected.current}
              todayMax={selected.daily.temperature_2m_max[0]}
              todayMin={selected.daily.temperature_2m_min[0]}
            />
            <HourlyForecast
              hourly={selected.hourly}
              currentTime={selected.current.time}
              onPressHour={openHourDetail}
            />
            <DailyForecast daily={selected.daily} onPressDay={openDayDetail} />
          </ScrollView>
        </Animated.View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.errorEmoji}>🌡️</Text>
          <Text style={styles.hint}>Chưa có dữ liệu thời tiết để hiển thị</Text>
          <Pressable style={styles.retryButton} onPress={load}>
            <Text style={styles.retryText}>Tải lại</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcebf8',
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  hint: {
    color: '#33475b',
    marginTop: 12,
    textAlign: 'center',
  },
  errorEmoji: {
    fontSize: 44,
  },
  error: {
    color: '#a33',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#1e6fb8',
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default HomeScreen;
