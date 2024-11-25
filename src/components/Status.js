import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {statusData} from '../utils/statusData';

const Status = ({tasks, setFilterTasks, activeStatus, setActiveStatus}) => {
  const [items, setItems] = useState(statusData);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const updatedItems = items.map(item => {
        const count = tasks.filter(task => task.status === item.value).length;
        return {...item, count};
      });
      setItems(updatedItems);
    } else {
      const resetItems = items.map(item => ({...item, count: 0}));
      setItems(resetItems);
    }
  }, [tasks]);

  const handleStatusFilter = value => {
    setActiveStatus(value);
    if (value) {
      const filtred = tasks.filter(task =>
        task.status.toLowerCase().includes(value.toLowerCase()),
      );
      setFilterTasks(filtred);
    } else {
      setFilterTasks(tasks);
    }
  };

  return (
    <View style={styles.container}>
      {items.map(item => (
        <TouchableOpacity
          onPress={() => handleStatusFilter(item.value)}
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor:
                activeStatus === item.value ? item.activeColor : item.color,
            },
          ]}>
          <Text
            style={{fontWeight: activeStatus === item.value ? '900' : '400'}}>
            {item.label}:{' '}
          </Text>
          <Text style={styles.count}>{item.count}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Status;
