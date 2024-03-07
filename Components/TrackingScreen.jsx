import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const ProgressBar = ({ progress, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Entregado':
        return '#ce112d'; // Verde
      case 'Revision':
        return '#FFC107'; // Amarillo
      case 'Progreso':
        return '#2196F3'; // Azul
      case 'Finalizado':
        return '#4CAF50'; // Rojo (tu color original)
      default:
        return '#e0e0e0'; // Gris predeterminado
    }
  };

  const getSectionWidth = () => {
    switch (status) {
      case 'Entregado':
        return '25%'; // 1/4
      case 'Revision':
        return '50%'; // 1/2
      case 'Progreso':
        return '75%'; // 3/4
      case 'Finalizado':
        return '100%'; // Completo
      default:
        return '0%'; // Ninguna sección
    }
  };

  return (
    <View style={styles.progressBar}>
      <View style={{ width: getSectionWidth(), backgroundColor: getStatusColor(), ...styles.progressIndicator }} />
      <Text style={styles.progressText}>{`${status}`}</Text>
    </View>
  );
};

const TrackingScreen = ({ estado }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulando el avance del progreso cada segundo
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Seguimiento del paquete</Text>
      {/* Utiliza el componente ProgressBar aquí, pasando el estado */}
      <ProgressBar progress={progress} status={estado} />
    </View>
  );
};

// Estilos del componente ProgressBar y TrackingScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-9,
    padding: 20,
  },
  headerText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 15
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  progressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default TrackingScreen;
