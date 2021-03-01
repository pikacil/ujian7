import React, { useState, useEffect } from 'react'

import { Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button } from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import { Alert, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const lstGender = ["Male", "Female"]
const lstMarital = ["Single", "Married"]
let camera = null;
const Checkout = ({navigation,route}) => {
    const {datanama,dataUmur}=route.params;  
  const [usernama, setDatanama] = useState(datanama)
    const [gambar,setGambar] = useState('https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/performer%20images/p844030/ChelseaIslan.jpg')
   
    const renderOption = (title) => (

        <SelectItem key={title} title={title} />
    );
    
 
   
   
   const saveImage = () => {
   
    const namefile = ""+new Date();
   
    const reference = storage().ref(namefile);

    const pathToFile = gambar;
    // uploads file
    reference.putFile(pathToFile).then(() => {
         console.log("Uploaded")
         storage()
         .ref(namefile)
         .getDownloadURL().then((downloadData) =>{
            console.log(downloadData)
            console.log(namefile)
            saveData(downloadData,namefile)
           
           
         })
    });
   
   }
   
   const saveData = (downloadData,namaGambar) => {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
     firestore()
    .collection('Checkout')
    .add({
        email:usernama,
        tanggal:date + '/' + month ,
        jammasuk: '',
        jamkeluar: hours+ ':' + min ,
        year: year,
      gambar: downloadData,
      namaGambar: namaGambar,
    })
    .then(() => {
      console.log('checkin added!');
    //   Alert.alert("Check in Berhasil")
       // navigation.navigate('Menu')
    });
    Alert.alert("Check out Berhasil")
     navigation.navigate('Menu',{datanama:usernama,})
   }

   const takePicture = async () => {
    console.log("test")
        if (camera) {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          console.log(JSON.stringify(data));
          setGambar(data.uri)
          console.log(data.uri);
          
        }
      };

    

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Layout style={styles.container}>
            <RNCamera
                    ref={ref => {
                        camera = ref;
                    }}
                    style={{flexDirection: 'row', justifyContent: 'center', height:400 , width:360 }}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}

                />
          
            <Card style={styles.containerPicture}>
                <Avatar style={styles.avatar} size='giant' source={{ uri: gambar }} />
               

                <Button onPress={() => takePicture()}>
                    Ambil Foto
            </Button>   

            </Card>
            
            <Card style={styles.containerPicture}>
                <Button onPress={() => { saveImage() }}>
                    Kirim Validasi
            </Button>
            </Card>
        </Layout>
        </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    
    layout: {
        margin: 15,
        alignItems: 'center',
    },

    containerPicture: {


        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    avatar: {
        alignItems: 'center',
        margin: 8,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },

});

export default Checkout

