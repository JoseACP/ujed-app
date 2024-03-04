import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const MapSelection = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handlePress = (event) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;

    // Encuentra el punto seleccionado
    const puntoSeleccionado = findSelectedPoint(x, y);

    // Si se seleccionó un punto, actualiza el estado
    if (puntoSeleccionado) {
      setSelectedPoint(puntoSeleccionado);
    } else {
      // Si no se seleccionó un punto, maneja la lógica adicional o ignora
      console.log('Coordenadas seleccionadas:', { x, y });

      // Restablece el punto seleccionado si no se hizo clic en un punto
      setSelectedPoint(null);
    }
  };

  const findSelectedPoint = (x, y) => {
    // Coordenadas de ejemplo, reemplázalas con tus propias coordenadas
    const puntos = [
      { x: 60.35, y: 345.06 },
      { x: 60.35, y: 374.14 },
      { x: 60.35, y: 405.43 },
      { x: 60.35, y: 434.16 },
      { x: 60.35, y: 465.42 },
      { x: 60.35, y: 492.51 },
      { x: 147.26, y: 493.51 },
      { x: 147.26, y: 467.61 },
      { x: 147.26, y: 442.16 },
      { x: 147.26, y: 417.43 },
      { x: 147.26, y: 349.80 },
      { x: 147.26, y: 323.98 },
      { x: 179.26, y: 238.80 },
      { x: 230.71, y: 238.80 },
      { x: 249, y: 238.80 },
      { x: 327.80, y: 242.88 },
      { x: 327.80, y: 330.88 },
      { x: 327.80, y: 363.97 },
      { x: 327.80, y: 399.62 },
      { x: 306.89, y: 490.15 },
    ];

    const touchRadius = 30;

    // Encuentra el punto dentro de un rango cercano al toque
    const punto = puntos.find((punto) => {
      const puntoX = punto.x;
      const puntoY = punto.y;

      return x >= puntoX - touchRadius && x <= puntoX + touchRadius
      && y >= puntoY - touchRadius && y <= puntoY + touchRadius;
    });

    return punto || null;
  };

  const renderPoints = () => {
    // Coordenadas de ejemplo, reemplázalas con tus propias coordenadas
    const puntos = [
      { x: 60.35, y: 345.06 },
      { x: 60.35, y: 374.14 },
      { x: 60.35, y: 405.43 },
      { x: 60.35, y: 434.16 },
      { x: 60.35, y: 465.42 },
      { x: 60.35, y: 492.51 },
      { x: 147.26, y: 493.51 },
      { x: 147.26, y: 467.61 },
      { x: 147.26, y: 442.16 },
      { x: 147.26, y: 417.43 },
      { x: 147.26, y: 349.80 },
      { x: 147.26, y: 323.98 },
      { x: 179.26, y: 238.80 },
      { x: 230.71, y: 238.80 },
      { x: 249, y: 238.80 },
      { x: 327.80, y: 242.88 },
      { x: 327.80, y: 330.88 },
      { x: 327.80, y: 363.97 },
      { x: 327.80, y: 399.62 },
      { x: 306.89, y: 490.15 },
    ];

    return puntos.map((punto, index) => (
      <View
        key={index}
        style={[
          styles.punto,
          { 
            left: punto.x,
            top: punto.y,
            backgroundColor: selectedPoint && selectedPoint.x === punto.x && selectedPoint.y === punto.y
              ? '#ce112d'
              : '#383838',
           },
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/mapa.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={handlePress} style={StyleSheet.absoluteFill} />
      {renderPoints()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
  },
  punto: {
    width: 12,
    height: 12,
    borderRadius: 10,
    position: 'absolute',
  },
});

export default MapSelection;
