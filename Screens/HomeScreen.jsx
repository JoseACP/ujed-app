import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
  } from 'react-native';
 
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Home from '../Components/Home'

  import Modal from "react-native-modal";
  import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
  import { FontAwesome6 } from '@expo/vector-icons';
  import {useEffect, useState} from 'react';
  import axios from 'axios';
import ImageSlider from '../Components/imageSlider';
import ImageContainer from '../Components/ImageContainer';
import Obras from '../Components/Obras';
import Mantenimiento from '../Components/Mantenimiento';

// import styles from './Login&Register/style'
  function HomeScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const userToken = route.params?.token || ''
    const [email, setEmail] = useState('');
    console.log(props);
    useEffect(() => {
      getEmail();
    }, []);
  
    async function getEmail() {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        setEmail(userEmail);
      } catch (error) {
        console.error('Error al obtener el email:', error);
      }
    }

    function renderComponentByRole() {
      if (email.includes('mantenimiento')) {
        return <Mantenimiento />;
      } else if (email.includes('obras')) {
        return <Obras />;
      } else {
        return <Home />;
      }
    }
  
    return (

      
      <>
        
        {renderComponentByRole()}
      </>
    );
  }
  
  
  export default HomeScreen;