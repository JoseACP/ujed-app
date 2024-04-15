const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} = require('react-native');
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';
import {log} from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  useEffect(() => {
    getUserId();
  }, []);


  async function getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      return null;
    }
  }

  async function getUserId() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('User ID:', userId);
      return userId;
    } catch (error) {
      console.error('Error al obtener el ID de usuario:', error);
      return null;
    }
  }

  // Función para navegar a la pantalla deseada con el token
  async function navigateWithToken(screenName, token, id) {
    navigation.navigate(screenName, { token, userId: id, email });
  }

  async function handleSubmit() {
    console.log(email, password);
    const userData = { email, password };

    try {
      const response = await axios.post('https://ujed-api.onrender.com/api/users/login', userData);
      console.log(response.data);
      const { token, id } = response.data;
      if (token && id) {
        Alert.alert('Logged In Successfully');
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', id);
        await AsyncStorage.setItem('userEmail', email);
        navigateWithToken('Home', token, id);
      } else {
        Alert.alert('Error de inicio de sesión', 'Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de inicio de sesión', 'Credenciales incorrectas. Inténtalo de nuevo.');
    }
  }

  async function handleLogout() {
    try {
      // Eliminar los datos de sesión almacenados
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      // Regresar a la pantalla de inicio de sesión
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    
    console.log(data, 'at app.jsx');
  
  }
  useEffect(()=>{
    getData();
    console.log("Hii");
  },[])

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: 'white'}}
      keyboardShouldPersistTaps={'always'}>
      <View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/mainLogo.png')}
          />
        </View>
        {/* Formulario */}
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>INICIAR SESION</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#ce112d"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </View>




          {/* Password */}
          <View style={styles.action}>
            <FontAwesome name="lock" color="#ce112d" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={e => setPassword(e.nativeEvent.text)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{marginRight: -10}}
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{marginRight: -10}}
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>




        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              <Text style={styles.textSign}>Ingresar</Text>
            </View>
          </TouchableOpacity>

          <View style={{padding: 15}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
              ¿Todavia no tienes una cuenta? <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                  <Text style={styles.bottomText}>Registrarte</Text>
                
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              
              
            </View>
           
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default LoginPage;