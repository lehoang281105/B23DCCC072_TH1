import type { HourlyData } from '../types';

export interface WeatherStatus {
  label: string;
  emoji: string;
}

/** Mã thời tiết WMO -> nhãn tiếng Việt + emoji */
const WEATHER_CODES: Record<number, WeatherStatus> = {
  0: { label: 'Trời quang', emoji: '☀️' },
  1: { label: 'Ít mây', emoji: '🌤️' },
  2: { label: 'Có mây', emoji: '⛅' },
  3: { label: 'Nhiều mây', emoji: '☁️' },
  45: { label: 'Sương mù', emoji: '🌫️' },
  48: { label: 'Sương mù đóng băng', emoji: '🌫️' },
  51: { label: 'Mưa phùn nhẹ', emoji: '🌦️' },
  53: { label: 'Mưa phùn', emoji: '🌦️' },
  55: { label: 'Mưa phùn dày', emoji: '🌦️' },
  56: { label: 'Mưa phùn đóng băng', emoji: '🌧️' },
  57: { label: 'Mưa phùn đóng băng dày', emoji: '🌧️' },
  61: { label: 'Mưa nhẹ', emoji: '🌧️' },
  63: { label: 'Mưa vừa', emoji: '🌧️' },
  65: { label: 'Mưa to', emoji: '🌧️' },
  66: { label: 'Mưa đóng băng', emoji: '🌧️' },
  67: { label: 'Mưa đóng băng nặng', emoji: '🌧️' },
  71: { label: 'Tuyết rơi nhẹ', emoji: '🌨️' },
  73: { label: 'Tuyết rơi', emoji: '🌨️' },
  75: { label: 'Tuyết rơi nặng', emoji: '❄️' },
  77: { label: 'Hạt tuyết', emoji: '🌨️' },
  80: { label: 'Mưa rào nhẹ', emoji: '🌦️' },
  81: { label: 'Mưa rào', emoji: '🌧️' },
  82: { label: 'Mưa rào nặng', emoji: '⛈️' },
  85: { label: 'Tuyết rào nhẹ', emoji: '🌨️' },
  86: { label: 'Tuyết rào nặng', emoji: '❄️' },
  95: { label: 'Dông', emoji: '⛈️' },
  96: { label: 'Dông kèm mưa đá', emoji: '⛈️' },
  99: { label: 'Dông mạnh kèm mưa đá', emoji: '⛈️' },
};

export function getWeatherStatus(code: number): WeatherStatus {
  return WEATHER_CODES[code] ?? { label: 'Không xác định', emoji: '🌡️' };
}

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];


export function formatHour(isoTime: string): string {
  return isoTime.slice(11, 16);
}


export function formatDay(dateStr: string): string {
  const date = new Date(dateStr);
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
}

export function findCurrentHourIndex(
  hourly: HourlyData,
  currentTime: string,
): number {
  const exact = hourly.time.indexOf(currentTime);
  if (exact >= 0) {
    return exact;
  }
  const next = hourly.time.findIndex(time => time >= currentTime);
  return next >= 0 ? next : 0;
}

/** UV index -> mức độ + màu hiển thị */
export function getUvLevel(uv: number): {label: string; color: string} {
  if (uv < 3) {
    return {label: 'Thấp', color: '#3e9b4f'};
  }
  if (uv < 6) {
    return {label: 'Trung bình', color: '#d9a013'};
  }
  if (uv < 8) {
    return {label: 'Cao', color: '#e07b00'};
  }
  if (uv < 11) {
    return {label: 'Rất cao', color: '#d63b2f'};
  }
  return {label: 'Cực đoan', color: '#a24bd6'};
}

const WIND_DIRECTIONS = [
  'Bắc',
  'Đông Bắc',
  'Đông',
  'Đông Nam',
  'Nam',
  'Tây Nam',
  'Tây',
  'Tây Bắc',
];

/** Góc gió (hướng gió đến từ) -> tên 8 hướng */
export function windDirectionLabel(deg: number): string {
  const index = Math.round((deg % 360) / 45) % 8;
  return WIND_DIRECTIONS[index];
}

/** Tầm nhìn (mét) -> chuỗi km */
export function formatVisibility(meters: number | null): string {
  if (meters == null) {
    return '—';
  }
  const km = meters / 1000;
  return `${km >= 10 ? Math.round(km) : km.toFixed(1)} km`;
}
