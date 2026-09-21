import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import type {City} from '../constants';

interface Props {
  cities: City[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function CityPicker({cities, selectedId, onSelect}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {cities.map(city => {
        const selected = city.id === selectedId;
        return (
          <TouchableOpacity
            key={city.id}
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={() => onSelect(city.id)}>
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
              {city.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chip: {
    backgroundColor: '#ffffff',
    borderColor: '#cfe0f1',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: '#1e6fb8',
    borderColor: '#1e6fb8',
  },
  chipText: {
    color: '#1e6fb8',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#ffffff',
  },
});

export default CityPicker;
