import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const GridComponent = ({ data }) => {
  const displayedData = data.slice(0, 4);
  const renderItem = ({ item}) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.imageUri }}
        style={styles.image}
      />
      {/* <Text style={styles.title}>{item.title}</Text> */}
    </View>
  );

  return (
    <FlatList
      data={displayedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Cambiado a 2 para mostrar dos columnas
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    item: {
      width: '48%',
      marginBottom: 16, // Espacio entre las filas
      alignItems: 'center',
      marginRight: '4%', // Espacio entre las columnas
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 8,
    },
    title: {
      marginTop: 8,
      fontSize: 16,
    },
  });

export default GridComponent;
