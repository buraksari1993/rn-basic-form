import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login} from './src/screens';
import {Button} from 'react-native';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerBackVisible: false,
            headerRight: () => (
              <Button
                title="Logout"
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
  );
};

export default App;
