import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {selectRateByUserId, setRate} from './ratingSlices';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootState} from '../../store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type Rate = {
  userId: number;
  userName: string;
  rate: number;
  desc: string;
};

type ratingScreenProp = NativeStackNavigationProp<RootStackParamList, 'Rating'>;

const schema = yup.object().shape({
  rate: yup
    .number()
    .required('Zorunlu Alan')
    .typeError('Sayısal karakter giriniz')
    .min(1, 'Minimum 1 olmalıdır')
    .max(5, 'Maximum 5 olmalıdır'),
  desc: yup
    .string()
    .required('Zorunlu Alan')
    .max(50, 'Maximum 50 karakter olmalıdır'),
});

export const Rating: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ratingScreenProp>();
  const route: RouteProp<{params: {id: number; name: string}}, 'params'> =
    useRoute();

  const userId = route.params?.id;
  const userName = route.params?.name;

  const selectedRate = useSelector((state: RootState) =>
    selectRateByUserId(state, userId),
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Rate>({
    defaultValues: {
      userId: userId,
      userName: userName,
      rate: 0,
      desc: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedRate?.userId) {
      reset(selectedRate);
    }
  }, [reset, selectedRate]);

  const onSubmit: any = handleSubmit(data => {
    dispatch(setRate(data));
    navigation.goBack();
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Kullanıcıyı Oyla</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Puan"
              placeholderTextColor="gray"
              style={[styles.input, errors.rate && styles.error]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
            />
          )}
          name="rate"
        />

        {errors.rate && (
          <Text style={styles.errorText}>{errors.rate?.message}</Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Açıklama"
              placeholderTextColor="gray"
              style={[styles.input, errors.desc && styles.error]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
          name="desc"
        />
        {errors.desc && (
          <Text style={styles.errorText}>{errors.desc?.message}</Text>
        )}
      </View>
      <View style={styles.button}>
        <Button title="Değerlendir" onPress={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
  },
  inputContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    marginTop: 16,
    fontSize: 16,
    padding: 8,
    borderRadius: 8,
    lineHeight: 20,
    borderWidth: 0.5,
    borderColor: '#555',
  },
  button: {
    alignSelf: 'flex-end',
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    paddingTop: 4,
    paddingLeft: 8,
  },
});
