import {WEATHER_API_URL} from '../constants';
import type {ForecastResponse} from '../types';

export async function fetchWeather(): Promise<ForecastResponse[]> {
  const response = await fetch(WEATHER_API_URL);
  if (!response.ok) {
    throw new Error(`Không tải được dữ liệu thời tiết (mã ${response.status})`);
  }
  const data = await response.json();
  // Nhiều toạ độ -> mảng, một toạ độ -> object đơn
  return Array.isArray(data) ? data : [data];
}
