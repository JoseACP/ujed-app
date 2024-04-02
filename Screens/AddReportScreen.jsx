import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from '../Screens/Login&Register/styleA';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list'

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const WelcomeScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (location) {
    console.log(`Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`);
  } else {
    console.log('Obteniendo ubicación...');
  }

  // Resto de tu lógica aquí

  return null; // No renderiza nada en la vista
};


export default function AddReportScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // const userToken = route.params?.token || '';
  const [token, setToken] = useState(null);

  const [selectedDescription, setSelectedDescription] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = React.useState("");

  const data = [
    {key:'1', value:'CCH', disabled:true},
    {key:'2', value:'ECT'},
    {key:'3', value:'EPD'},
    {key:'4', value:'EPN', disabled:true},
    {key:'5', value:'FCFA'},
    {key:'6', value:'FCE'},
    {key:'7', value:'FECA'},
    {key:'8', value:'FCQ'},
    {key:'9', value:'FADERyCIPOL'},
    {key:'10', value:'FTS'},
    {key:'11', value:'ELe'},
    {key:'12', value:'FCCFyD'},
    {key:'13', value:'FAEO'},
    {key:'14', value:'FAMEN'},
    {key:'15', value:'FAOD'},
    {key:'16', value:'FPyTCH'},
    {key:'17', value:'EPEA'},
    {key:'18', value:'ESM'},
    {key:'19', value:'FMVZ'},
    {key:'20', value:'FAZ'},
    {key:'21', value:'FCB'},
    {key:'22', value:'FCQ GP'},
    {key:'23', value:'ELe GP'},
    {key:'24', value:'FACSA'},
    {key:'25', value:'FICA'},


]
  
  // console.log(userToken)
  console.log(selectedDescription)
  

  useEffect(() => {
    // Función para obtener el token almacenado en AsyncStorage
    async function getTokenFromStorage() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          setToken(storedToken);
          console.log('Token almacenado en AsyncStorage:', storedToken);
        }else{
          console.log('No se encontró ningún token en AsyncStorage.');
        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    }

    // Llama a la función para obtener el token al montar la pantalla
    getTokenFromStorage();
  }, []);

  
  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (route.params?.selectedDescription) {
      setSelectedDescription(route.params.selectedDescription);
    }
  }, [route.params?.selectedDescription]);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };

  const selectImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      ...(useLibrary ? {} : { cameraType: 'back' })
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.cancelled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + '.jpeg';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };

  const uploadReport = async () => {
    // Construir el objeto de datos a enviar
    const data = new FormData();
    data.append('title', selectedDescription); // Usamos el valor de selectedDescription para el campo title
    data.append('location', 'faculty/building/classroom')
    data.append('description', description); // Usamos el valor del campo de descripción (description)
    images.forEach(image => {
      // Agregamos cada imagen al campo 'files' utilizando su URL local
      data.append('files', {
        uri: image,
        type: 'image/jpeg', // Suponiendo que las imágenes son JPEG
        name: image.split('/').pop() // Nombre de archivo basado en la URL local
      });
    });
  
    // Realizar la solicitud a la API
    try {
      const response = await axios.post('https://ujed-api.onrender.com/api/reports', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Incluir el token de autenticación en el encabezado
        }
      });
      // Manejar la respuesta de la API según sea necesario
      console.log('Respuesta de la API:', response.data);
      // Limpiar el estado después de enviar el reporte
      setSelectedDescription('');
      setDescription('');
      setImages([]);
      navigation.goBack()
      // Mostrar una alerta o realizar otras acciones después de subir el reporte
      Alert.alert('Reporte subido exitosamente');
    } catch (error) {
      // Manejar errores en la solicitud a la API
      console.error('Error al subir el reporte:', error);
      // Mostrar una alerta u otras acciones en caso de error
      Alert.alert('Error al subir el reporte. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  const deleteImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  const deleteLastImage = async () => {
    if (images.length > 0) {
      const lastImageUri = images[images.length - 1].uri;
      await FileSystem.deleteAsync(lastImageUri);
      setImages(images.filter((i) => i.uri !== lastImageUri));
    }
  };
  

  const renderItem = ({ item }) => {
    const filename = item.split('/').pop();
    return (
      <View style={styles.saveImageV}>
        <View style={{ position: 'relative' }}>
        <Image style={styles.saveImage} source={{ uri: item }} />
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => {
            deleteImage(item); // Elimina la imagen seleccionada
            deleteLastImage(); // Elimina la última imagen en el estado
          }}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      </View>
    );
  };
  

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}
      >
        <View>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={30} color="#ce112d" />
            </TouchableOpacity>
          </View>
          <View style={{
            alignItems: 'center',
            marginTop: 50
          }}>
            <Text style={styles.text_header}>Generar reporte </Text>
          </View>
          <View style={[styles.logoContainer, {marginTop:20}]}>
            <Text style ={[styles.text1, {marginBottom: 20}]}> ¿En qué facultad te encuentras?</Text>
            
          </View>

          <View style={{
            paddingHorizontal:60,
            marginTop:15
            }}>
          <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              label="Plantel"
              boxStyles={{
                borderRadius:5,

              }}
            />
          </View>


          <View style={styles.logoContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Mapa', {
                  selectedDescription,
                  updateSelectedDescription: setSelectedDescription,
                });
              }}
            >
              <Image
                style={styles.logo}
                source={require('../assets/images/ANTIGUA FAC DE ENFERMERIA PLANTA ALTA-1.png')}
              />
            </TouchableOpacity>
            <Text style ={styles.text1}>{selectedDescription}</Text>
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.action}>
              <TextInput
                placeholder="Descripción"
                style={styles.textInput}
                value={description} // Valor del TextInput se obtiene del estado
                onChangeText={setDescription} // Función para actualizar el estado cuando cambia el texto
              />
            </View>
          </View>
          <View style={{ marginBottom: 40}}>
            {/* <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>My Images</Text> */}
            <FlatList data={images} renderItem={renderItem} />
            {uploading && (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                ]}
              >
                <ActivityIndicator color="#fff" animating size="large" />
              </View>
            )}
          </View>
          <View style={styles.button}>
            <View style={{ 
                flexDirection: 'row',
                 }}
                 >
            <TouchableOpacity 
              style={[styles.inBut, { marginRight: 40 }]} 
              onPress={() => selectImage(true)}
            >
              <View>
                <Feather name="folder" size={50} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.inBut}
              onPress={() => selectImage(false)}
            >
              <View>
                <Feather name="camera" size={50} color="white" />
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.bottomButton}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.inButT}
              onPress={() => {
                uploadReport();
                deleteLastImage(); // Llama a deleteLastImage en lugar de deleteImage
              }}
            >
              <View>
                <Text style={styles.textSign}>Registrar reporte</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}