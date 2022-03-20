import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../../App';
import {RootState} from '../../store';
import {fetchUsers} from './usersSlices';

type usersScreenProp = NativeStackNavigationProp<RootStackParamList, 'Users'>;

export const Users: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<usersScreenProp>();

  const {users, loading} = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClick = () => {
    navigation.navigate('Posts');
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <SafeAreaView edges={['left', 'right']}>
      <FlatList
        data={users}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => {
          return (
            <Pressable key={item.id} onPress={handleClick} style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.phone}</Text>
              <Text>{item.email}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
    paddingBottom: 50,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 20,
  },
  loader: {
    flex: 1,
  },
});
