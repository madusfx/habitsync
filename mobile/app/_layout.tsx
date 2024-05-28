import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import LoginScreen from './Login';
import TabLayout from './(tabs)/_layout';
import RegisterScreen from './Register';
import { StatusBar } from 'expo-status-bar';

export default function RootLayoutNav() {
  const Stack = createNativeStackNavigator();

  let [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <StatusBar style="light" backgroundColor="black" />
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
      
    </NavigationContainer>
  );
}
