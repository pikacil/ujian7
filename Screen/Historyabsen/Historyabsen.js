import React, {useEffect,useState}from 'react'
import {Text,View, StyleSheet, Alert,TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Avatar, Button, Icon, List, ListItem } from '@ui-kitten/components';
import storage from '@react-native-firebase/storage';
// import { DataTable } from 'react-native-paper';
// import ReactDataGrid from 'react-data-grid'
// import { Table, Row, Rows } from 'react-native-table-component';

const Historyabsen = ({ navigation, route }) => {
  const { datanama, dataUmur } = route.params;
  const [usernama, setDatanama] = useState(datanama)
  // const [tableHead, settableHead] = useState(['Tanggal', 'Masuk', 'Pulang', 'Lembur']);
  // const [tableData, settableData] = useState([]); 
  const [users, setUsers] = useState([]); 
  const [jammasuk, setjammasuk] = useState([]); 

  useEffect(() => {
    const dataa = firestore()
      .collection('Checkin')
      .where('email', '==',usernama)
      .onSnapshot(querySnapshot => {
        const jammasuk = [];
        querySnapshot.forEach(documentSnapshot => {
          jammasuk.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
         
        });
        setjammasuk(jammasuk);
        console.log(jammasuk)
      });
    return () => dataa();
  }, [])

 

 

  const renderItemIcon = (props,gambar) => {
  return(
    <Avatar style={styles.avatar} size='giant' source={{uri:gambar}}  />
  )
  }


  const renderItem = ({ item, index }) => {
 
    return (
      <View>
         <View style={{ backgroundColor: 'powderblue',flexDirection:'row'}}>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }}>{item.tanggal}</Text></View>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }}>{item.jammasuk}</Text></View>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }}>{item.jammasuk}</Text></View>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text style={{ fontSize: 30 }}>-</Text></View>
    </View>
      
      
      </View>   
    // <ListItem
    //   title={`${item.tanggal}`}
    //   description={`${item.jammasuk}`}
    
    
    // />
    )
  }
    
    
  
  ;
  
  
  return (
    <View> 
      <View></View>
      <View style={{paddingTop:30}}>
         <View style={{flex: 1, backgroundColor: 'powderblue',flexDirection:'row'}}>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text >tanggal</Text></View>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text>jam masuk</Text></View>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text >jam pulang</Text></View>
    <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}><Text >lembur</Text></View>
    </View>
      
      
      </View>   
      
    <View style={{paddingTop:30}}><List
      style={styles.container}
      data={jammasuk}
      renderItem={renderItem}
    /></View>
    </View>
  );
};

export default Historyabsen

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

