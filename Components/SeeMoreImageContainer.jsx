import React from 'react';
import { View } from 'react-native';
import ReportGridComponent from './ReportGridComponent';

const SeeMoreImageContainer = () => {
  const data = [
    { id: 1, title: 'Imagen 1', imageUri: 'https://www.ujed.mx/storage/noticias/2017/08/la-ujed-organizara-un-foro-en-el-que-se-definira-el-rumbo-de-la-educacion-superior-thumb.jpg' },
    { id: 2, title: 'Imagen 2', imageUri: 'https://www.internationalfinanceconference.org/ifc2023/wp-content/uploads/12/2023/06/feca_ujed.jpeg' },
    { id: 3, title: 'Imagen 1', imageUri: 'https://www.elsoldedurango.com.mx/local/1y6cx4-feca-ujed/ALTERNATES/LANDSCAPE_1140/FECA%20-%20UJED' },
    { id: 4, title: 'Imagen 2', imageUri: 'https://www.elsoldedurango.com.mx/local/qoxa6e-libreria-ujed.jpg/ALTERNATES/LANDSCAPE_1140/librer%C3%ADa%20ujed.jpg' },
    { id: 5, title: 'Imagen 1', imageUri: 'https://www.ujed.mx/storage/noticias/2017/08/la-ujed-organizara-un-foro-en-el-que-se-definira-el-rumbo-de-la-educacion-superior-thumb.jpg' },
    { id: 6, title: 'Imagen 2', imageUri: 'https://www.internationalfinanceconference.org/ifc2023/wp-content/uploads/12/2023/06/feca_ujed.jpeg' },
    { id: 7, title: 'Imagen 1', imageUri: 'https://www.elsoldedurango.com.mx/local/1y6cx4-feca-ujed/ALTERNATES/LANDSCAPE_1140/FECA%20-%20UJED' },
    { id: 8, title: 'Imagen 2', imageUri: 'https://www.elsoldedurango.com.mx/local/qoxa6e-libreria-ujed.jpg/ALTERNATES/LANDSCAPE_1140/librer%C3%ADa%20ujed.jpg' },
   

    // Agrega más elementos según sea necesario
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ReportGridComponent data={data} />
    </View>
  );
};

export default SeeMoreImageContainer;
