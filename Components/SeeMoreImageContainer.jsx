import React from 'react';
import { View } from 'react-native';
import ReportGridComponent from './ReportGridComponent';
import {useNavigation} from '@react-navigation/native';

const SeeMoreImageContainer = () => {
  const navigation = useNavigation();
  const data = [
    { id: 1, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024', title: 'Imagen 1', imageUri: 'https://www.ujed.mx/storage/noticias/2017/08/la-ujed-organizara-un-foro-en-el-que-se-definira-el-rumbo-de-la-educacion-superior-thumb.jpg', estado: 'Entregado', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 2, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024',  title: 'Imagen 2', imageUri: 'https://www.internationalfinanceconference.org/ifc2023/wp-content/uploads/12/2023/06/feca_ujed.jpeg', estado: 'Revision', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh.'},
    { id: 3, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024',  title: 'Imagen 1', imageUri: 'https://www.elsoldedurango.com.mx/local/1y6cx4-feca-ujed/ALTERNATES/LANDSCAPE_1140/FECA%20-%20UJED', estado: 'Finalizado' , description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae tortor condimentum lacinia quis. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Ultricies integer quis auctor elit sed vulputate mi. Consectetur a erat nam at lectus urna duis. Ipsum dolor sit amet consectetur.'},
    { id: 4, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024',  title: 'Imagen 2', imageUri: 'https://www.elsoldedurango.com.mx/local/qoxa6e-libreria-ujed.jpg/ALTERNATES/LANDSCAPE_1140/librer%C3%ADa%20ujed.jpg', estado: 'Finalizado' , description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed elementum tempus egestas sed sed risus. Quam elementum pulvinar etiam non. Maecenas pharetra convallis posuere morbi leo. Arcu odio ut sem nulla pharetra diam sit amet nisl.' },
    { id: 5, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024',  title: 'Imagen 1', imageUri: 'https://www.ujed.mx/storage/noticias/2017/08/la-ujed-organizara-un-foro-en-el-que-se-definira-el-rumbo-de-la-educacion-superior-thumb.jpg', estado: 'Entregado' , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque felis imperdiet proin fermentum leo. Consectetur purus ut faucibus pulvinar.' },
    { id: 6, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024',  title: 'Imagen 2', imageUri: 'https://www.internationalfinanceconference.org/ifc2023/wp-content/uploads/12/2023/06/feca_ujed.jpeg', estado: 'Finalizado', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing. Ut placerat orci nulla pellentesque dignissim. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. ' },
    { id: 7, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024',  title: 'Imagen 1', imageUri: 'https://www.elsoldedurango.com.mx/local/1y6cx4-feca-ujed/ALTERNATES/LANDSCAPE_1140/FECA%20-%20UJED', estado: 'Revision', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra. Sed pulvinar proin gravida hendrerit. Mauris nunc congue nisi vitae suscipit tellus mauris a diam.'},
    { id: 8, ubicacion: 'Lorem ipsum dolor sit amet', fecha: '12/02/2024',  title: 'Imagen 2', imageUri: 'https://www.elsoldedurango.com.mx/local/qoxa6e-libreria-ujed.jpg/ALTERNATES/LANDSCAPE_1140/librer%C3%ADa%20ujed.jpg', estado: 'Progreso', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus mattis rhoncus urna neque viverra. Sed pulvinar proin gravida hendrerit. Mauris nunc congue nisi vitae suscipit tellus mauris a diam.' },
   
   

    // Agrega más elementos según sea necesario
  ];

  const handleItemClick = (item) => {
    // Pasa la información del ítem a través de la navegación
    navigation.navigate('Status', { itemId: item.id, imageUrl: item.imageUri, estado: item.estado, description: item.description, ubicacion: item.ubicacion, fecha: item.fecha });
  };

  return (
 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ReportGridComponent data={data} onItemClick={handleItemClick} />

    </View>

  );
};

export default SeeMoreImageContainer;
