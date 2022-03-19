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

type loginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Auth = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const navigation = useNavigation<loginScreenProp>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Auth>({defaultValues: {email: '', password: ''}});

  const onSubmit = handleSubmit(() => {
    navigation.navigate('Home');
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          }}
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
          <Text style={styles.errorText}>This is not valid.</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
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
          <Text style={styles.errorText}>This is required.</Text>
        )}
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
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
    width: '50%',
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
