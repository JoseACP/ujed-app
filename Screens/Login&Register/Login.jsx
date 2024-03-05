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
  
  function LoginPage({props}) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleSubmit() {
      console.log(email, password);
      const userData = {
        email: email,
        password,
      };
  


      axios.post('http://192.168.1.72:5001/login-user', userData).then(res => {
        console.log(res.data);
        if (res.data.status == 'ok') {
          Alert.alert('Logged In Successfull');
          AsyncStorage.setItem('token', res.data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          if (email.includes('mantenimiento')){
            navigation.navigate('MantenimientoScreen')
          } else if (email.includes('obras')) {
            navigation.navigate('ObrasScreen')
          } else{
            navigation.navigate('Home');
          }
          // navigation.navigate('Home');
        }
      });
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
            <View style={styles.action}>
              <FontAwesome name="lock" color="#ce112d" style={styles.smallIcon} />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChange={e => setPassword(e.nativeEvent.text)}
              />
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