import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Login';
import TabLayout from './(tabs)/_layout';
import RegisterScreen from './Register';
import { SafeAreaView } from 'react-native';

export default function RootLayoutNav() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
          <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Registro'}} />
          <Stack.Screen name="Home" component={TabLayout} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
