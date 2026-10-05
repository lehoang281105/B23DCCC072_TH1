import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  /** Màu nhấn cho giá trị (VD: màu theo mức UV) */
  valueColor?: string;
}

function MetricTile({icon, label, value, sub, valueColor}: Props) {
  return (
    <View style={styles.tile}>
      <Text style={styles.label}>
        {icon} {label}
      </Text>
      <Text style={[styles.value, valueColor != null && {color: valueColor}]}>
        {value}
      </Text>
      {sub != null && sub !== '' && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flexBasis: '47%',
    flexGrow: 1,
    marginHorizontal: 6,
    marginVertical: 6,
    padding: 14,
  },
  label: {
    color: '#6b7f93',
    fontSize: 13,
  },
  value: {
    color: '#1c2b3a',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },
  sub: {
    color: '#6b7f93',
    fontSize: 13,
    marginTop: 2,
  },
});

export default MetricTile;
