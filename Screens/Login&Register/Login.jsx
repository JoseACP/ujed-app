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
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  

  async function handleSubmit() {
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('https://ujed-api.onrender.com/api/users/login', userData);
      const { token, id } = response.data;
      if (token && id) {
        Alert.alert('Logged In Successfully');
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', id);
        if (email.includes('mantenimiento')) {
          navigation.navigate('MantenimientoScreen', { token: token, userId: id });
        } else if (email.includes('obras')) {
          navigation.navigate('ObrasScreen', { token: token, userId: id });
        } else {
          navigation.navigate('HomeScreen', { token: token, userId: id });
        }
      } else {
        Alert.alert('Error de inicio de sesión', 'Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  }

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
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                style={{marginRight: -10}}
                color="#ce112d"
                size={23}
              />
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
