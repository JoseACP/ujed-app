import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    Alert,
} from 'react-native';
import React from 'react';
import { Camera, CameraType, Constants } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef, useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../Components/Button';
import Buttonb from '../Components/Buttonb';


function CameraScreen() {
    const navigation = useNavigation();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null); 

    useEffect (() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (e) {
                console.log(e);
            }
            
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Imagen guardada')
                setImage(null);
            } catch (e) {
                console.log(e)
            }
        }
    }


    if (hasCameraPermission === false) {
        return <Text>No se accedío a la camara</Text>
    }


  return (
    <View style={styles.container}>
        {!image ?
        <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
        >
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30, 
            }}>
                <Buttonb icon={'arrowleft'} onPress={()=> navigation.goBack()}/>
                <Button icon={'retweet'} onPress={() => {
                    setType(type === CameraType.back ? CameraType.front : CameraType.back)
                }}/>
                <Button icon={'flash'}
                color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
                onPress={() =>{
                    setFlash(flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                        )
                }}
                />
            </View>
        </Camera>
        :
        <Image source={{uri: image}} style={styles.camera}/>
        }
        <View>
            {image?
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 50
            }}
            >
                <Button title={"Tomar otra vez"} icon="retweet" onPress={() =>setImage(null)}/>
                <Button title={"Guardar"} icon="check" onPress={saveImage}/>
            </View>
            :
            <Button title={'Tomar foto'} icon="camera" onPress={takePicture}/>
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: ' center', 
        paddingBottom: 20,
    },
    camera: {
        flex:1,
        borderRadius: 20,
    }

});

export default CameraScreen
