import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gridresueltas from './Gridresueltas';
const Resueltas = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        
        if (storedToken) {
          setToken(storedToken);
          const response = await fetch(`https://ujed-api.onrender.com/api/reports/department/obras`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }

          const responseData = await response.json();
          // Filtra los reportes que están resueltos
          const filteredData = responseData.filter(item => item.status === 'resuelto');
          // Mapea los datos recibidos para adaptarlos a tu estructura de datos requerida
          const modifiedData = filteredData.map(item => ({
            id: item.id,
            title: item.title,
            imageUri: item.images.length > 0 ? item.images[0].url : 'https://imgs.search.brave.com/k_igGCUtM9UAFo2IejoBF2ctlbFUeolBzcU6dxVnKfc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9uby1pbWFn/ZS1pY29uLTUxMng1/MTItbGZvYW5sMHcu/cG5n',
            description: item.description,
            fecha: item.created_at,
            estado: item.status
          }));
          setData(modifiedData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    fetchData();
  }, []);

  const handleItemClick = (item) => {
    navigation.navigate('Status', {
      itemId: item.id,
      imageUrl: item.imageUri,
      estado: item.estado,
      description: item.description,
      ubicacion: item.title,
      fecha: item.fecha,
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 80}}>
        <Text
        style={{
          marginTop:12,
          marginBottom:25,
          color: '#ce112d',
            fontWeight: 'bold',
            fontSize: 22,
            margin: 15
        }}
        >Aun no tienes reportes</Text>
        <Image source={{ uri: 'https://imgs.search.brave.com/ZzjG7zgtJhb5nkI1A1ocQvovjZnHDRYplDYGlcZm19Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni82MDcvNjA3Njc0/LnBuZw' }} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Gridresueltas data={data} onItemClick={handleItemClick} />
    </View>
  );
};

export default Resueltas;
