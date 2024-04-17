import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import { AntDesign } from '@expo/vector-icons';
  import Modal from "react-native-modal";

function Modal() {
  return (
    <div>
      <View style={{marginTop:'3%', paddingRight:-20}}>
        <TouchableOpacity
            style={[styles.backIcon, {marginTop:'6%', marginStart:'82%'}]}
            onPress={toggleModal}
            >
             <Image
          source={{ uri: 'https://imgs.search.brave.com/cuFuXnr6J9ok7BFdN3oK62Pp_g_QoVjqUPzv1VBrjdw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n' }}
          style={{width:40,
          height:40}}
        />
          </TouchableOpacity>
  
        </View>

          <View style={{ flex: 1}}>

          <Modal isVisible={isModalVisible}>
            <View style={{ 
              backgroundColor: '#BFBDBDDE',
              width:'100%',
              height:'25%',
              borderRadius: 20,
              alignItems:'center'
            }}>
              <TouchableOpacity
                  style={styles.backIcon}
                  onPress={toggleModal}
                  >
                  <AntDesign name="close" size={24} color="#B30000" />
                </TouchableOpacity>
              <View 
              style={{
                backgroundColor:'#FFFFFF',
                alignItems:'flex-start',
                width:'96%',
                height:'50%',
                marginTop:40,
                borderRadius:20,
                padding:15,
                paddingTop:15,
                
                alignContent: 'space-between'
              }}
              >
                <Image
                  source={{ uri: 'https://imgs.search.brave.com/cuFuXnr6J9ok7BFdN3oK62Pp_g_QoVjqUPzv1VBrjdw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n' }}
                  style={{
                    width: 40,
                    height: 40
                  }} />
                <Text style={{marginTop:10, fontSize:18, fontWeight:'500', color:'black'}}>{email}</Text>
                
              </View>
   
              <Button title="Cerrar sesión" color='red' marginTop='10' onPress={handlePress} />
            </View>
          </Modal>
          </View>

    </div>
  )
}

export default Modal
