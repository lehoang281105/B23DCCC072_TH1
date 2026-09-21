import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {fetchWeather} from './src/api/weather';
import CityPicker from './src/components/CityPicker';
import CurrentWeather from './src/components/CurrentWeather';
import DailyForecast from './src/components/DailyForecast';
import HourlyForecast from './src/components/HourlyForecast';
import {CITIES} from './src/constants';
import type {ForecastResponse} from './src/types';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [forecasts, setForecasts] = useState<ForecastResponse[]>([]);
  const [selectedCityId, setSelectedCityId] = useState(CITIES[0].id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const selectedIndex = CITIES.findIndex(city => city.id === selectedCityId);
  const selected = selectedIndex >= 0 ? forecasts[selectedIndex] : undefined;

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1e6fb8" />
          <Text style={styles.hint}>Đang tải dữ liệu thời tiết...</Text>
        </View>
      ) : error !== null ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={load}>
            <Text style={styles.retryText}>Thử lại</Text>
          </Pressable>
        </View>
      ) : selected ? (
        <ScrollView contentContainerStyle={styles.content}>
          <CityPicker
            cities={CITIES}
            selectedId={selectedCityId}
            onSelect={setSelectedCityId}
          />
          <CurrentWeather
            cityName={CITIES[selectedIndex].name}
            current={selected.current}
          />
          <HourlyForecast
            hourly={selected.hourly}
            currentTime={selected.current.time}
          />
          <DailyForecast daily={selected.daily} />
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcebf8',
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
  },
  error: {
    color: '#a33',
    fontSize: 16,
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

export default App;
