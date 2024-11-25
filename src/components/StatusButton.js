import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatusButton = ({iconName, color, size, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Icon name={iconName} color={color} size={size} />
    </TouchableOpacity>
  );
};

export default StatusButton;
