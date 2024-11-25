import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import colors from '../themes/Colors';
import {formatDate} from '../utils/formatDate';

const CustomTextInput = ({
  imageSource,
  onChangeText,
  value,
  style,
  label,
  onPressIcon,
  isDate,
  ...rest
}) => {
  return (
    <TouchableOpacity
      disabled={onPressIcon ? false : true}
      onPress={() => (onPressIcon ? onPressIcon() : {})}
      style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.image} />
        {!onPressIcon ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.textInput}
            {...rest}
          />
        ) : (
          <Text style={styles.date}>
            {value && formatDate(value?.toString())}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
    opacity: 0.2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  label: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '500',
  },
});

export default CustomTextInput;
