import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Users} from './src/screens';
import {Button} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Users: undefined;
  Posts: undefined;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Users"
            component={Users}
            options={({navigation}) => ({
              headerBackVisible: false,
              headerTitle: 'Kullanıcılar',
              headerRight: () => (
                <Button
                  title="Çıkış"
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Login'}],
                    })
                  }
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
