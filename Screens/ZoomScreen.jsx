import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    Alert,
} from 'react-native';
import React from 'react'
import MapSelection from '../Components/MapSelection';

function ZoomScreen() {
  return (
    <ScrollView
    style={{backgroundColor: 'white'}}
    >
        <View>
            <MapSelection/>
        </View>
    </ScrollView>
  )
}

export default ZoomScreen