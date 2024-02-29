import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MapSelection = () => {
  const handlePress = (event) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;

    console.log('Coordenadas seleccionadas:', { x, y });
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../assets/images/ANTIGUA FAC DE ENFERMERIA PLANTA ALTA-1.png')} // Ruta relativa a la carpeta assets
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 400,
  },
});

export default MapSelection;
