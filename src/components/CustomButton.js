import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../themes/Colors';

const CustomButton = ({label, style, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  label: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default CustomButton;
