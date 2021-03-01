import React, {useEffect,useState}from 'react'
import {View, StyleSheet, Alert,TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Avatar,Input,Text, Button, Icon, List, ListItem } from '@ui-kitten/components';
import storage from '@react-native-firebase/storage';

const Menu = ({navigation,route}) => {
  const {datanama,dataUmur}=route.params;  
  const [usernama, setDatanama] = useState(datanama)
  const [users, setUsers] = useState([]); // Initial empty array of users


  useEffect(() => {
    const dataa = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
      });
    return () => dataa();
  }, [])

  const deleteData = (dataID,namaGambar) =>{
    console.log("delete : "+dataID)

    storage()
    .ref(namaGambar)
    .delete();

    firestore()
    .collection('Users')
    .doc(dataID)
    .delete()
    .then(()=>{
      Alert.alert("Data berhasil di hapus")
    });
  }

  const renderItemAccessory = (props,param) => (
    <View>
      <Button size='tiny' onPress={()=>{navigation.navigate('UpdateScreen',{
        dataID:param.key,
        dataName:param.name,
        dataUmur:param.umur,
        dataGambar:param.namaGambar,
        urlGambar:param.gambar,
      })}}>Update</Button>
      <Button size='tiny' onPress={()=>{deleteData(param.key,param.namaGambar)}}>Delete</Button>
    </View>    
  );

  const renderItemIcon = (props,gambar) => {
  console.log(props)
  return(
    <Avatar style={styles.avatar} size='giant' source={{uri:gambar}}  />
  )
  }


  const renderItem = ({ item, index }) => {
 
    console.log(item)
    return (
      <View>
      
    <ListItem
      title={`${item.name} ${index + 1}`}
      description={`${item.gps} ${index + 1}`}
      accessoryLeft={(props)=>renderItemIcon(props,item.gambar)}
      accessoryRight={(props)=>renderItemAccessory(props, item)}
      gambar = {item.gambar}
    />
    </View>
    )
  }
    
    
  
  ;
  
  
  return (
    <View style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: 'powderblue',flexDirection:'row'}}>
    <View style={{flex: 1, backgroundColor: 'red',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }} onPress={() => navigation.navigate('Checkin',{datanama:usernama,})}  >checkin</Text></View>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }} onPress={() => navigation.navigate('Checkout',{datanama:usernama,})}  >checkout</Text></View>
    </View>
    <View style={{flex: 1, backgroundColor: 'powderblue',flexDirection:'row'}}>
    <View style={{flex: 1, backgroundColor: 'green',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }} onPress={() => navigation.navigate('Ijin',{datanama:usernama,})} >Ijin</Text></View>
    <View style={{flex: 1, backgroundColor: 'red',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }} onPress={() => navigation.navigate('Historyabsen',{datanama:usernama,})} >History Absen</Text></View>
    </View>
    <View style={{flex: 2, backgroundColor: 'skyblue',justifyContent: 'center',alignItems: 'center'}} >
      
    <View style={{ flexDirection:'row'}} >
    
  
     
      </View>
     
      
      </View>
    
  </View>
  );
};

export default Menu

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
});
