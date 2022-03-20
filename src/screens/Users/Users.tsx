import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
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
  const {rates} = useSelector((state: RootState) => state.rating);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getRate = useCallback(
    (userId: number) => {
      const rate = rates.find(r => r.userId === userId)?.rate;
      const color = rate === 5 ? '#32a86d' : rate === 1 ? '#f55' : '#eda215';

      return {rate, color};
    },
    [rates],
  );

  const handleClick = (item: any) => {
    navigation.navigate('Rating', item);
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
          const {rate, color} = getRate(item.id);

          return (
            <Pressable
              key={item.id}
              onPress={() => handleClick(item)}
              style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.phone}</Text>
              <Text>{item.email}</Text>
              {rate && (
                <View style={[styles.rateView, {backgroundColor: color}]}>
                  <Text style={styles.rate}>{rate}</Text>
                </View>
              )}
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
  rateView: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  rate: {
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    height: 20,
  },
  loader: {
    flex: 1,
  },
});
