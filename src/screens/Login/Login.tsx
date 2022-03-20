import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type loginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Auth = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email giriniz')
    .required('Zorunlu Alan'),
  password: yup
    .string()
    .min(8, 'Minimum 8 karakter olmalıdır')
    .required('Zorunlu Alan'),
});

export const Login: React.FC = () => {
  const navigation = useNavigation<loginScreenProp>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Auth>({
    defaultValues: {email: 'asd@asd.com', password: 'asd123123'},
    resolver: yupResolver(schema),
  });

  const onSubmit: any = handleSubmit(() => {
    navigation.navigate('Users');
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              style={[styles.input, errors.email && styles.error]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />

        {errors.email && (
          <Text style={styles.errorText}>{errors.email?.message}</Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Şifre"
              placeholderTextColor="gray"
              secureTextEntry
              style={[styles.input, errors.password && styles.error]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password?.message}</Text>
        )}
      </View>

      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '70%',
    marginVertical: 48,
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
    borderWidth: 0.2,
    borderRadius: 16,
    paddingVertical: 8,
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
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
