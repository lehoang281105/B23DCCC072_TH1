export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}


export const CITIES: City[] = [
  { id: 'hanoi', name: 'Hà Nội', latitude: 20.4737, longitude: 106.0229 },
  { id: 'hochiminh', name: 'TP. Hồ Chí Minh', latitude: 10.823, longitude: 106.6296, },
  { id: 'danang', name: 'Đà Nẵng', latitude: 16.0678, longitude: 108.2208 },
  { id: 'newyork', name: 'New York', latitude: 40.7143, longitude: -74.006 },
  { id: 'hongkong', name: 'Hồng Kông', latitude: 25.0766, longitude: 114.2657 },
];

const latitudes = CITIES.map(city => city.latitude).join(',');
const longitudes = CITIES.map(city => city.longitude).join(',');

export const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast' +
  `?latitude=${latitudes}&longitude=${longitudes}` +
  '&current=temperature_2m,relative_humidity_2m,weather_code' +
  '&hourly=temperature_2m,relative_humidity_2m,rain,visibility,weather_code' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
  '&timezone=Asia%2FBangkok&forecast_days=7';
