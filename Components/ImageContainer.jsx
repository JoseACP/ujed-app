import React from 'react';
import { View } from 'react-native';
import GridComponent from './GridComponent'; // Ajusta la ruta según tu estructura de archivos

const ImageContainer = () => {
  const data = [
    { id: 1, title: 'Imagen 1', imageUri: 'https://www.ujed.mx/storage/noticias/2017/08/la-ujed-organizara-un-foro-en-el-que-se-definira-el-rumbo-de-la-educacion-superior-thumb.jpg' },
    { id: 2, title: 'Imagen 2', imageUri: 'https://www.internationalfinanceconference.org/ifc2023/wp-content/uploads/12/2023/06/feca_ujed.jpeg' },
    { id: 3, title: 'Imagen 1', imageUri: 'https://www.elsoldedurango.com.mx/local/1y6cx4-feca-ujed/ALTERNATES/LANDSCAPE_1140/FECA%20-%20UJED' },
    { id: 4, title: 'Imagen 2', imageUri: 'https://www.elsoldedurango.com.mx/local/qoxa6e-libreria-ujed.jpg/ALTERNATES/LANDSCAPE_1140/librer%C3%ADa%20ujed.jpg' },
    { id: 5, title: 'Imagen 1', imageUri: 'https://cdn.milenio.com/uploads/media/2021/10/04/universidad-juarez-durango-ujed-mauricio.jpg' },
    { id: 6, title: 'Imagen 2', imageUri: 'https://www.ujed.mx/storage/noticias/2022/12/la-fcq-ujed-con-amplia-oferta-educativa-y-mas-integrantes-en-el-sni-sm.jpg' },
    { id: 8, title: 'Imagen 2', imageUri: 'https://www.elsoldedurango.com.mx/local/dubf3p-oficina-central-de-la-universidad-juarez-del-estado-de-durango-ujed.jpeg/ALTERNATES/LANDSCAPE_400/Oficina%20central%20de%20la%20Universidad%20Ju%C3%A1rez%20del%20Estado%20de%20Durango%20(UJED).jpeg' },

    // Agrega más elementos según sea necesario
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GridComponent data={data} />
    </View>
  );
};

export default ImageContainer;
