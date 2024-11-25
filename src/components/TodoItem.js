import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../themes/Colors';
import StatusButton from './StatusButton';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDate} from '../utils/formatDate';
import {statusData} from '../utils/statusData';

const TodoItem = ({data, onDelete}) => {
  const isClosed = data?.status === 'closed';
  const titleText = data?.title?.toUpperCase() || '';
  const statusDetails = statusData.find(item => item.value === data?.status);
  const statusBackgroundColor = statusDetails?.color || '#FFFFFF';

  const navigation = useNavigation();
  return (
    <View style={[styles.container, {borderColor: statusBackgroundColor}]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.taskTitle, isClosed && styles.completedTask]}>
          {titleText}
        </Text>
        <View style={styles.statusView}>
          <StatusButton
            iconName="pencil"
            color="black"
            size={20}
            onPress={() => navigation.navigate(ScreenName.addTask, {data})}
          />
          <StatusButton
            iconName="delete"
            onPress={() => onDelete()}
            color="#c0695e"
            size={20}
          />
        </View>
      </View>
      <Text style={styles.description}>{data?.description}</Text>
      <View style={styles.footerContainer}>
        <View>
          <Text>Start Date</Text>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" color={colors.primary} size={15} />
            <Text style={styles.timeText}>
              {data?.startDate && formatDate(data.startDate)}
            </Text>
          </View>
        </View>
        <View>
          <Text>End Date</Text>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" color={colors.primary} size={15} />
            <Text style={styles.timeText}>
              {data?.endDate ? formatDate(data.endDate) : ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  statusView: {
    flexDirection: 'row',
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  description: {},
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  timeText: {
    color: colors.primary,
    fontWeight: '600',
    marginHorizontal: 5,
    fontSize: 12,
  },
});

export default TodoItem;
