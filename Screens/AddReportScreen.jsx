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
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';

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
  
  // console.log(userToken)
  console.log(selectedDescription)
  const navigateToOtherScreen = () => {
    // Obtener la fecha actual
    const currentDate = new Date().toISOString();
  
    // Navegar a OtherScreen con los parámetros necesarios
    navigation.navigate('Pdf', {
      selectedDescription,
      currentDate,
      description: description // Si también quieres enviar la descripción actual
    });
  };

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

  const renderItem = ({ item }) => {
    const filename = item.split('/').pop();
  return (
    <View style={{ position: 'relative' }}>
      <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 5, right: 5 }}
        onPress={() => deleteImage(item)}
      >
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>

// {/* <Ionicons.Button name="cloud-upload" onPress={() => uploadImage(item)} /> */}
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
            <Text style={styles.text_header}>Agregar reporte </Text>
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
            {/* <View style={[styles.bottomButton, {marginTop: 20}]}>
            <TouchableOpacity 
              style={styles.inBut}
            onPress={navigateToOtherScreen}
            >
              <View>
                <Feather name="file" size={50} color="white" />
              </View>
            </TouchableOpacity>
            </View> */}
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
              onPress={uploadReport}
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
const styles = StyleSheet.create({
    inButT: {
        width: '70%',
        backgroundColor: '#ce112d',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 50,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
    editIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        right: 2,
        margin: 15,
    },
    logoContainer: {
        marginBottom: -12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        height: 260,
        width: 260,
        marginTop: 50,
        marginBottom:40,
        borderWidth: 1,
        borderColor: '#ce112d',
        borderRadius: 8,
      },
    backIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        left: 2,
        margin: 15,
    },
    avatar: {
        borderRadius: 100,
        marginTop: -250,
        // marginLeft: 105,
        backgroundColor: 'white',
        height: 200,
        width: 200,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 420475
    nameText: {
        color: 'black',
        fontSize: 28,

        fontStyle: 'normal',
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bookCountMain: {
        borderColor: '#b0b0b0',
        borderWidth: 1,
        marginTop: 18,
        marginHorizontal: 20,

        borderRadius: 20,
        flexDirection: 'row',
        width: '88%',
    },
    bookCount: {
        width: '50%',
        borderColor: '#b0b0b0',
        borderRightWidth: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookCountNum: {
        color: '#5D01AA',
        fontSize: 34,
        fontWeight: '800',
    },
    bookCountText: { color: '#b3b3b3', fontSize: 14, fontWeight: '500' },
    infoMain: {
        marginTop: 10,
    },
    infoCont: {
        width: '100%',
        flexDirection: 'row',
    },
    infoIconCont: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,

        alignItems: 'center',
        elevation: -5,
        borderColor: 'black',
        backgroundColor: 'black',
    },

    infoText: {
        width: '80%',
        flexDirection: 'column',
        marginLeft: 25,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#e6e6e6',
    },
    infoSmall_Text: {
        fontSize: 13,
        color: '#b3b3b3',
        fontWeight: '500',
    },
    infoLarge_Text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
    booksUploadedMain: {
        paddingHorizontal: 10,
        paddingBottom: 30,
        marginTop: 20,
    },
    flatlistDiv: {
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    booksUploadedText: {
        fontSize: 26,
        color: 'black',
        fontWeight: '700',
        paddingLeft: 20,
        paddingBottom: 8,
    },
    booksUploadedCard: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 9,
        marginBottom: 9,

        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        elevation: 3,
    },
    booksUploadedImgDiv: {
        width: '28%',
    },
    booksUploadedImg: {
        width: '100%',
        height: 120,
        borderRadius: 15,
    },
    cardMidDiv: {
        paddingHorizontal: 10,
        width: '55%',
        position: 'relative',
    },
    approvedText: {
        fontSize: 12,
        color: '#0d7313',
        fontWeight: '600',
        marginLeft: 5,
    },
    cardBookNameText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700',
        marginTop: 2,
    },
    cardBookAuthor: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
        marginTop: 1,
    },
    cardRating: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cardRatingCount: {
        fontSize: 14,
        marginTop: -2,
        paddingLeft: 4,
        color: '#303030',
    },
    cardEditDiv: {
        width: '17%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardEditBtn: {
        height: 44,
        width: 44,
        backgroundColor: '#ce112d',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',

        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#ce112d',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        paddingHorizontal: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '600',
    },
    text_header: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 15
    },
    button: {
        alignItems: 'center',
        marginTop: -20,
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
    },
    inBut: {
        width: '25%',
        backgroundColor: '#ce112d',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    text_container: {
        marginTop: 20,
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center', // Alinea verticalmente los elementos en el centro
    },
    text1: {
        fontSize: 17,
        fontWeight: '700',
        color:'#ce112d'
    },
    text2: {
        fontSize: 14, // Ajusta el tamaño del segundo texto
        color: 'blue', // Cambia el color a azul
        marginLeft: 10, // Añade un espacio entre los textos
    },
    loginContainer: {
        marginTop: 2,
        // backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 40,
        margin: 15
    },
    textInput: {
        flex: 4,
        marginTop: -12,
        color: '#000000',

    },
    action: {
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 60,
        marginTop: 30,

        paddingHorizontal: 10,

        borderWidth: 1,
        borderColor: '#ce112d',
        borderRadius: 8,
    },
    image: {
        width: 220,
        height: 150,
        borderRadius: 8,
        marginBottom: 8, // Espaciado entre la imagen y el título
      },
});
