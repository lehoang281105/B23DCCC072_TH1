export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  precipitation: number;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  rain: number[];
  precipitation: number[];
  precipitation_probability: (number | null)[];
  visibility: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  uv_index: number[];
}

export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: (number | null)[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
  uv_index_max: number[];
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyData;
  daily: DailyData;
}

/** Tham số truyền sang màn hình chi tiết */
export interface DetailParams {
  forecast: ForecastResponse;
  cityName: string;
  kind: 'hourly' | 'daily';
  index: number;
}

export type RootStackParamList = {
  Home: undefined;
  Detail: DetailParams;
};
