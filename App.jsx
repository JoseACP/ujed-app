import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UserScreen from './Screens/UserScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import DrawerContent from './DrawerContent';
import SplashScreen from 'react-native-splash-screen';
import {useEffect, useState} from 'react';
import LoginPage from './Screens/Login&Register/Login';
import RegisterPage from './Screens/Login&Register/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddReportScreen from './Screens/AddReportScreen';

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarHidden: true,
        // statusBarColor: '#FFFFFF',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={
          {
            // headerLeft: () => {
            //   return (
            //     <Icon
            //       name="menu"
            //       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            //       size={30}
            //       color="#fff"
            //     />
            //   );
            // },
          }
        }
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* // Agrega esto a tu Stack.Navigator en StackNav */}
      <Stack.Screen name="AddReportScreen" component={AddReportScreen} />

      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="LoginUser" component={LoginNav}/>
    
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={StackNav} />

    </Drawer.Navigator>
  );
};

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Home" component={DrawerNav} />
    </Stack.Navigator>
  );
};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
    setIsLoggedIn(data);
  }

  // useEffect(() => {
  //   getData();
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 900);
  // }, [isLoggedIn]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginNav />}
    </NavigationContainer>
  );
}
export default App;